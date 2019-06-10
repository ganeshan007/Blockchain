const SHA256=require('crypto-js/sha256');

class Block{
	constructor (index,timestamp,data,prevHash=''){
		this.index=index;
		this.timestamp=timestamp;
		this.data=data;
		this.prevHash=prevHash;
		this.hash=this.calculateHash();
	}

	calculateHash(){
		return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();

	}
}

class Blockchain{
	constructor(){
		this.chain=[this.createGenBlock()];
	}

	createGenBlock(){
		return new Block(0,"09/06/2019","Genesis Block","0");
	}
	getLatestBlock(){
		return this.chain[this.chain.length-1];
	}
	addBlock(newBlock){
		newBlock.prevHash=this.getLatestBlock().hash;
		newBlock.hash=newBlock.calculateHash();
		this.chain.push(newBlock);
	}
	isChainValid(){
		for(let i=1;i<this.chain.length;i++)
		{
			const currentBlock=this.chain[i];
			const prevBlock=this.chain[i-1];

			if(currentBlock.hash!=currentBlock.calculateHash())
			{
				return false;
			}

			if(currentBlock.prevHash!=prevBlock.hash){
				return false;
			}
		}
		return true;

	}
}

let gcoin=new Blockchain();
gcoin.addBlock(new Block(1,"09/06/2019",{amount: 4}));
gcoin.addBlock(new Block(2,"10/06/2019",{amount: 10}));
//guahahhas

//console.log(JSON.stringify(gcoin,null,4));
console.log('Is chain Valid?' + gcoin.isChainValid());
