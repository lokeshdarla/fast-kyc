"use client";
import React, { useState, useEffect, useContext } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { CustomerLayout } from "@/components/CustomerLayout";
import { StateContext } from "@/context/ContractContext";

const TransactionHistory = () => {
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
  const { account } = useWallet();
  // const { fetchTransactions } = useContext<any>(StateContext);

	const aptosConfig = new AptosConfig({ network: Network.DEVNET });
  const aptos = new Aptos(aptosConfig);
  
  

	const fetchTransactions = async () => {
		if (!account?.address) return;
    
		try {
			setIsLoading(true);
			const response = await aptos.getAccountTransactions({
				accountAddress: account.address,
				limit: 100,
			});
			setTransactions(response);
		} catch (error) {
			console.error("Failed to fetch transactions:", error);
			setError("Failed to load transactions");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (account?.address) {
			fetchTransactions();
		}
	}, [account?.address]);

	const truncateHash = (hash) => {
		return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
	};

	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text);
	};

	if (!account) {
		return (
			<Card className='w-full'>
				<CardContent className='p-6'>
					<div className='text-center text-muted-foreground'>
						Please connect your wallet to view transactions
					</div>
				</CardContent>
			</Card>
		);
	}

	if (isLoading) {
		return (
			<Card className='w-full'>
				<CardContent className='p-6'>
					<div className='text-center text-muted-foreground'>Loading...</div>
				</CardContent>
			</Card>
		);
	}

	if (error) {
		return (
			<Card className='w-full'>
				<CardContent className='p-6'>
					<div className='text-center text-red-500'>{error}</div>
				</CardContent>
			</Card>
		);
	}

  return (
		<CustomerLayout>
			<Card className='w-full'>
				<CardHeader>
					<CardTitle>Transaction History</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='rounded-md border'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Function</TableHead>
									<TableHead>Document Name</TableHead>
									<TableHead>Sender</TableHead>
									<TableHead>Transaction Hash</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{transactions.map((tx) => {
									const functionName =
										tx.payload?.function?.split("::").pop() || "-";
									return (
										<TableRow key={tx.hash}>
											<TableCell className='font-medium'>
												{functionName}
											</TableCell>
											<TableCell>{tx.payload?.arguments?.[0] || "-"}</TableCell>
											<TableCell>
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger className='flex items-center space-x-2'>
															<span>{truncateHash(tx.sender)}</span>
															<Copy
																className='h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground'
																onClick={() => copyToClipboard(tx.sender)}
															/>
														</TooltipTrigger>
														<TooltipContent>
															<p>Copy address</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</TableCell>
											<TableCell>
												<div className='flex items-center space-x-2'>
													<span>{truncateHash(tx.hash)}</span>
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger asChild>
																<Button
																	variant='ghost'
																	size='icon'
																	className='h-8 w-8 p-0'
																	onClick={() => copyToClipboard(tx.hash)}
																>
																	<Copy className='h-4 w-4' />
																</Button>
															</TooltipTrigger>
															<TooltipContent>
																<p>Copy transaction hash</p>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger asChild>
																<Button
																	variant='ghost'
																	size='icon'
																	className='h-8 w-8 p-0'
																	onClick={() =>
																		window.open(
																			`https://explorer.aptoslabs.com/txn/${tx.hash}`,
																			"_blank"
																		)
																	}
																>
																	<ExternalLink className='h-4 w-4' />
																</Button>
															</TooltipTrigger>
															<TooltipContent>
																<p>View in explorer</p>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												</div>
											</TableCell>
											<TableCell>
												<Badge variant={tx.success ? "default" : "destructive"}>
													{tx.success ? "Success" : "Failed"}
												</Badge>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</CustomerLayout>
	);
};

export default TransactionHistory;
