const express = require('express');
const { Web3 } = require('web3'); // Correct the import of web3
const app = express();
const port = 3000;

// Configure connection to an Ethereum node (can be local or remote)
const web3 = new Web3('http://127.0.0.1:8545');

// ABI and address of your smart contract
const contractABI = [
    {
      "inputs": [],
      "name": "getMessage",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
];

const contractAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'; // Replace with the address of your contract

// Create an instance of the contract
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// Endpoint to interact with the contract
app.get('/api/test', async (req, res) => {
    try {
        // Call a function of the contract
        const result = await contractInstance.methods.getMessage().call();

        // Send the response to the client
        res.json({ result });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});