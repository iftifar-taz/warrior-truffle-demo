App = {
	web3Provider: null,
	contracts: {},
	account: '0x0',
	accounts: [],
	hasVoted: false,

	init: () => {
		return App.initWeb3();
	},

	initWeb3: () => {
		// TODO: refactor conditional
		if (typeof web3 !== 'undefined') {
			// If a web3 instance is already provided by Meta Mask.
			App.web3Provider = web3.currentProvider;
			web3 = new Web3(web3.currentProvider);
		} else {
			// Specify default instance if no web3 instance provided
			App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
			web3 = new Web3(App.web3Provider);
		}
		console.log("1. web3Object.version = ", web3.version.api);
		return App.initContract();
	},

	initContract: () => {
		$.getJSON("TribesOfWar.json", (tribesOfWar) => {
			// Instantiate a new truffle contract from the artifact
			App.contracts.TribesOfWar = TruffleContract(tribesOfWar);
			// Connect provider to interact with contract
			App.contracts.TribesOfWar.setProvider(App.web3Provider);

			//App.listenForEvents();

			return App.render();
		});
	},

	render: () => {
		var tribesOfWarInstance;
		var loader = $("#loader");
		var content = $("#content");

		loader.show();
		content.hide();

		web3.eth.getAccounts((err, accounts) => {
			if (err === null) {
				App.accounts = accounts;
			}
		});
		// Load account data
		web3.eth.getCoinbase((err, account) => {
			if (err === null) {
				App.account = account;
			}
		});

		// Load contract data
		App.contracts.TribesOfWar.deployed().then((instance) => {
			tribesOfWarInstance = instance;
			return tribesOfWarInstance.warriorsCount();
		}).then((warriorsCount) => {
			var warriorsResults = $("#warriorsResults");
			warriorsResults.empty();

			for (var i = 1; i <= warriorsCount; i++) {
				tribesOfWarInstance.warriors(i).then((warrior) => {
					warriorsResults.append(`
					<tr>
						<td>${warrior[0]}</td>
						<td>${warrior[1]}</td>
						<td>${warrior[2]}</td>
						<td>${warrior[3]}</td>
						<td>${warrior[4]}</td>
						<td>${warrior[5]}</td>
						<td>${warrior[6]}</td>
					</tr>`);
				});
			}
			loader.hide();
			content.show();
		}).catch(err => {
			console.warn(err);
		});
	},

	addWarrior: () => {
		var name = $('#name').val();
		var level = $('#level').val();
		var attack = $('#attack').val();
		var defend = $('#defend').val();
		var strategy = $('#strategy').val();
		var winCount = $('#winCount').val();
		var lossCount = $('#lossCount').val();

		App.contracts.TribesOfWar.deployed().then((instance) => {
			return instance.addWarrior(name, level, attack, defend, strategy, winCount, lossCount, { from: App.accounts[0] });
		}).then((result) => {
			// Wait for votes to update
			$("#content").hide();
			$("#loader").show();
		}).catch((err) => {
			console.error(err);
		});
	}
};

$(() => {
	$(window).load(() => {
		App.init();
	});
});