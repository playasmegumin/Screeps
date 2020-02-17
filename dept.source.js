module.exports = {
    run: function(){
        
        //Source1R1
        /*if(Game.creeps['Source1R1'] == undefined && Game.rooms['W35N28'].energyAvailable >= 650){
            var body = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE]; // ==600
            var name = 'Source1R1';
            const err = Game.spawns['Ber'].spawnCreep(body,name,{memory:{role:'srcminer'}});
        }else if(Game.creeps['Source1R1'] == undefined && Game.rooms['W34N28'].energyAvailable >= 650){
            var body = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE]; // ==600
            var name = 'Source1R1';
            const err = Game.spawns['S2'].spawnCreep(body,name,{memory:{role:'srcminer'}});
        }

        //Source2R1
        if(Game.creeps['Source2R1'] == undefined && Game.rooms['W35N28'].energyAvailable >= 750){
            var body = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE]; // ==600
            var name = 'Source2R1';
            const err = Game.spawns['Ber'].spawnCreep(body,name,{memory:{role:'srcminer'}});
        }

        //Source1R2
        if(Game.creeps['Source1R2'] == undefined){
            if(Game.rooms['W34N28'].energyAvailable >= 650){
                var body = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE]; // ==550
                var name = 'Source1R2';
                const err = Game.spawns['S2'].spawnCreep(body,name,{memory:{role:'srcminer'}});
            }else if(Game.rooms['W35N28'].energyAvailable >= 650){
                var body = [WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE]; // ==550
                var name = 'Source1R2';
                const err = Game.spawns['Ber'].spawnCreep(body,name,{memory:{role:'srcminer'}});
            }
        }

        //Source2R2
        if(Game.creeps['Source2R2'] == undefined && Game.rooms['W34N28'].energyAvailable >= 650){
            var body = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE]; // ==550
            var name = 'Source2R2';
            const err = Game.spawns['S2'].spawnCreep(body,name,{memory:{role:'srcminer'}});
        }*/

        //MineralR1
        var mineral = Game.getObjectById('5bbcb1af40062e4259e93202');
        if(!Game.creeps['MineralR1'] && Game.rooms['W35N28'].energyAvailable >= 1600 && mineral.mineralAmount > 0){
            var body = [WORK,WORK,WORK,WORK,WORK,MOVE];
            var name = 'MineralR1';
            const err = Game.spawns['Ber'].spawnCreep(body,name,{memory:{role:'miner',target:'5bbcb1af40062e4259e93202'}});
        }

        if(!Game.creeps['MP 1'] && Game.rooms['W35N28'].energyAvailable >= 500 && mineral.mineralAmount > 0){
            var body = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
            var name = 'MP 1';
            if(!Game.spawns['Ber'].spawning) Game.spawns['Ber'].spawnCreep(body,name,{memory:{role:'mpicker',target:'5e1814ae2c97615c7c9188cd'}});
        }

        //MineralR2
        var mineral2 = Game.getObjectById('5bbcb1b540062e4259e9324a');
        if(!Game.creeps['MineralR2'] && Game.rooms['W34N28'].energyAvailable >= 1600 && mineral2.mineralAmount > 0){
            var body = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE];
            var name = 'MineralR2';
            const err = Game.spawns['S2'].spawnCreep(body,name,{memory:{role:'miner',target:'5bbcb1b540062e4259e9324a'}});
        }

        if(!Game.creeps['MP 2'] && Game.rooms['W34N28'].energyAvailable >= 900 && mineral2.mineralAmount > 0){
            var body = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
            var name = 'MP 2';
            if(!Game.spawns['S2'].spawning) Game.spawns['S2'].spawnCreep(body,name,{memory:{role:'mpicker',target:'5e0f4f15e9b1859a88c1b1fd'}});
        }

        //MineralR3
        var mineral3 = Game.getObjectById('5bbcb17c40062e4259e92fa7');
        if(!Game.creeps['MineralR3'] && Game.rooms['W42N28'].energyAvailable >= 750 && mineral3.mineralAmount > 0){
            var body = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE];
            var name = 'MineralR3';
            const err = Game.spawns['R3S1'].spawnCreep(body,name,{memory:{role:'miner',target:'5bbcb17c40062e4259e92fa7'}});
        }

        if(!Game.creeps['MP 3'] && Game.rooms['W42N28'].energyAvailable >= 900 && mineral3.mineralAmount > 0){
            var body = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
            var name = 'MP 3';
            if(!Game.spawns['R3S1'].spawning) Game.spawns['R3S1'].spawnCreep(body,name,{memory:{role:'mpicker',target:'5e2d0bedc6101b13f3dd2f69'}});
        }

        //MineralR4
        var mineral4 = Game.getObjectById('5bbcb14d40062e4259e92d89');
        if(!Game.creeps['MineralR4'] && Game.rooms['W48N31'].energyAvailable >= 750 && mineral4.mineralAmount > 0){
            var body = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE];
            var name = 'MineralR4';
            const err = Game.spawns['R4S1'].spawnCreep(body,name,{memory:{role:'miner',target:'5bbcb14d40062e4259e92d89'}});
        }

        if(!Game.creeps['MP 4'] && Game.rooms['W48N31'].energyAvailable >= 900 && mineral4.mineralAmount > 0){
            var body = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
            var name = 'MP 4';
            if(!Game.spawns['R4S1'].spawning) Game.spawns['R4S1'].spawnCreep(body,name,{memory:{role:'mpicker',target:'5e31f7030c74a35f3e0310b0'}});
        }

        //MineralR5
        var mineral5 = Game.getObjectById('5bbcb14440062e4259e92d19');
        if(!Game.creeps['MineralR5'] && Game.rooms['W49N35'].energyAvailable >= 750 && mineral5.mineralAmount > 0){
            var body = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE];
            var name = 'MineralR5';
            const err = Game.spawns['R5S'].spawnCreep(body,name,{memory:{role:'miner',target:'5bbcb14440062e4259e92d19'}});
        }

        if(!Game.creeps['MP 5'] && Game.rooms['W49N35'].energyAvailable >= 900 && mineral5.mineralAmount > 0){
            var body = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
            var name = 'MP 5';
            if(!Game.spawns['R5S'].spawning) Game.spawns['R5S'].spawnCreep(body,name,{memory:{role:'mpicker',target:'5e417c9418f3812778bc0f8e'}});
        }

        //MineralR6
        var mineral6 = Game.getObjectById('5bbcb16540062e4259e92e9a');
        if(!Game.creeps['MineralR6'] && Game.rooms['W45N41'].energyAvailable >= 750 && mineral6.mineralAmount > 0){
            var body = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE];
            var name = 'MineralR6';
            const err = Game.spawns['R6S1'].spawnCreep(body,name,{memory:{role:'miner',target:'5bbcb16540062e4259e92e9a'}});
        }

        if(!Game.creeps['MP 6'] && Game.rooms['W45N41'].energyAvailable >= 900 && mineral6.mineralAmount > 0){
            var body = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
            var name = 'MP 6';
            if(!Game.spawns['R6S1'].spawning) Game.spawns['R6S1'].spawnCreep(body,name,{memory:{role:'mpicker',target:'5e43f2880003e727c6665828'}});
        }
    }
};