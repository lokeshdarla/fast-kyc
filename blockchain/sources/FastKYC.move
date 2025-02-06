module my_addr::kycv9 {
    use std::string::String;
    use aptos_std::table::{Self, Table};
    use std::signer;
    use std::vector;
    use std::error;

    struct Document has drop, store {
        content: vector<u8>,
        hash: vector<u8>,
    }

    struct UserStorage has key {
        documents: Table<String, Document>,
        verified_orgs: vector<address>,
    }

    struct OrgStorage has key {
        name: String,
        description: String,
        required_docs: vector<String>,
        verified_users: vector<address>,
    }

    const E_MISSING_REQUIRED_DOCUMENTS: u64 = 4;

    public entry fun create_organization(
        account: &signer,
        name: String,
        description: String,
        required_docs: vector<String>,
    ) {
        let account_addr = signer::address_of(account);
        assert!(
            !exists<OrgStorage>(account_addr),
            error::already_exists(1)
        );
        move_to(account, OrgStorage {
            name,
            description,
            required_docs,
            verified_users: vector::empty(),
        });
    }

    public entry fun upload_document(
        user: &signer,
        doc_type: String,
        content: vector<u8>,
        hash: vector<u8>,
    ) acquires UserStorage {
        let user_addr = signer::address_of(user);
        if (!exists<UserStorage>(user_addr)) {
            move_to(user, UserStorage {
                documents: table::new(),
                verified_orgs: vector::empty(),
            });
        };
        let user_storage = borrow_global_mut<UserStorage>(user_addr);
        let doc = Document { content, hash };
        table::add(&mut user_storage.documents, doc_type, doc);
    }

    public entry fun verify_kyc(
        user: &signer,
        org_address: address,
    ) acquires UserStorage, OrgStorage {
        assert!(exists<OrgStorage>(org_address), error::not_found(2));
        let org_storage = borrow_global_mut<OrgStorage>(org_address);
        
        let user_addr = signer::address_of(user);
        assert!(exists<UserStorage>(user_addr), error::not_found(3));
        let user_storage = borrow_global_mut<UserStorage>(user_addr);
        let required_docs = &org_storage.required_docs;
        
        let i = 0;
        let len = vector::length(required_docs);
        
        while (i < len) {
            let doc_type = vector::borrow(required_docs, i);
            assert!(
                table::contains(&user_storage.documents, *doc_type), 
                E_MISSING_REQUIRED_DOCUMENTS
            );
            i = i + 1;
        };

        add_to_verified(&mut user_storage.verified_orgs, org_address);
        add_to_verified(&mut org_storage.verified_users, user_addr);
    }

    fun add_to_verified(list: &mut vector<address>, addr: address) {
        let i = 0;
        let len = vector::length(list);
        while (i < len) {
            if (*vector::borrow(list, i) == addr) {
                return
            };
            i = i + 1;
        };
        vector::push_back(list, addr);
    }
    #[view]
    public fun is_verified(user_address: address, org_address: address): bool acquires UserStorage {
    assert!(exists<UserStorage>(user_address), error::not_found(3));
    
    let user_storage = borrow_global<UserStorage>(user_address);

    let i = 0;
    let len = vector::length(&user_storage.verified_orgs);
    while (i < len) {
        if (*vector::borrow(&user_storage.verified_orgs, i) == org_address) {
            return true;
        };
        i = i + 1;
    };
    false
}
    public fun get_organization_details(org_address: address): (String, String, vector<String>) acquires OrgStorage {
        assert!(exists<OrgStorage>(org_address), error::not_found(2));
        let org_storage = borrow_global<OrgStorage>(org_address);
        (org_storage.name, org_storage.description, org_storage.required_docs)
    }
}