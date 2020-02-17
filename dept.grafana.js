module.exports = {
    run: function(room){
        if(Memory.grafana[room] == null) Memory.grafana[room] = {setup:1};

        Memory.grafana.global = {
            cpu: Game.cpu.getUsed()
        }
        let progress = 0;
        let lvl = Game.rooms[room].controller.level;
        let storageEnergy = Memory.rooms[room].storage?Game.rooms[room].storage.store.getUsedCapacity('energy'):0;
        switch(lvl){
            case 1: progress = 0; break;
            case 2: progress = 200; break;
            case 3: progress = 45200; break;
            case 4: progress = 180200; break;
            case 5: progress = 585200; break;
            case 6: progress = 1800200; break;
            case 7: progress = 5445200; break;
            case 8: progress = 16380200; break;
        }
        progress += lvl==8?0:Game.rooms[room].controller.progress;
        Memory.grafana[room] = {
            lvl: Game.rooms[room].controller.level,
            lvlProgress: progress,
            storageEnergy: storageEnergy,
            energyAvailable: Game.rooms[room].energyAvailable
        };
    }
};