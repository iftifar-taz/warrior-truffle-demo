var TribesOfWar = artifacts.require("./TribesOfWar.sol");

let instance;
beforeEach(async () => {
    instance = await TribesOfWar.deployed();
});

contract("TribesOfWar", (accounts) => {
    // console.log(accounts);
    it('deploys contract', () => {
        assert.ok(instance.address);
    });

    it("initializes with one warriors", async () => {
        warriorsCount = await instance.warriorsCount();
        assert.equal(1, warriorsCount);
    });

    it("can add new warrior", async () => {
        const account = accounts[0];
        const txReceipt = await instance.addWarrior("Warrior 2", 2, 2, 2, 2, 0, 0, { from: account });
        warriorsCount = await instance.warriorsCount();
        assert.equal(2, warriorsCount);
    });

    it("warriors has correct values", async () => {
        warrior1 = await instance.warriors(1);
        assert.equal("Warrior 1", warrior1.name);
        assert.equal(1, warrior1.level);
        assert.equal(1, warrior1.attack);
        assert.equal(1, warrior1.defend);
        assert.equal(1, warrior1.strategy);
        assert.equal(0, warrior1.winCount);
        assert.equal(0, warrior1.lossCount);
        warrior2 = await instance.warriors(2);
        assert.equal("Warrior 2", warrior2.name);
        assert.equal(2, warrior2.level);
        assert.equal(2, warrior2.attack);
        assert.equal(2, warrior2.defend);
        assert.equal(2, warrior2.strategy);
        assert.equal(0, warrior2.winCount);
        assert.equal(0, warrior2.lossCount);
    });
});