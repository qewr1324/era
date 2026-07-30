export function generate(params: any): string {
	return `[profile.default]
src = 'src'
out = 'out'
libs = ['lib']
solc = "0.8.20"

[rpc_endpoints]
mainnet = "https://eth-mainnet.g.alchemy.com/v2/\${ALCHEMY_API_KEY}"
sepolia = "https://eth-sepolia.g.alchemy.com/v2/\${ALCHEMY_API_KEY}"

[etherscan]
mainnet = { key = "\${ETHERSCAN_API_KEY}" }
sepolia = { key = "\${ETHERSCAN_API_KEY}" }

[fuzz]
runs = 1000
max_test_rejects = 65536

[invariant]
runs = 256
depth = 15
fail_on_revert = true`;
}
