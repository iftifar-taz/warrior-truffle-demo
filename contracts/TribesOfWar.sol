pragma solidity ^0.5.0;

contract TribesOfWar {
    struct Warrior {
        string name;
        uint256 level;
        uint256 attack;
        uint256 defend;
        uint256 strategy;
        uint256 winCount;
        uint256 lossCount;
    }

    mapping(uint => Warrior) public warriors;
    uint public warriorsCount;

    constructor () public {
        addWarrior("Warrior 1", 1, 1, 1, 1, 0, 0);
    }

    function addWarrior (string memory _name, uint256 _level, uint256 _attack, uint256 _defend, uint256 _strategy, uint256 _winCount, uint256 _lossCount) public {
        warriors[++warriorsCount] = Warrior({
            name: _name,
            level: _level,
            attack: _attack,
            defend: _defend,
            strategy: _strategy,
            winCount: _winCount,
            lossCount: _lossCount
        });
    }
}
