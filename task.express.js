module.exports = {
    init: function(room){
        global[room] = { expressQueue: new Array() };
        global.timestamp = new Array();
    },
    constructor: function(room,src,tgt,resType,amount,src_floor = 0,tgt_cell = -1){
        let task = {
            src: src,
            tgt: tgt,
            resType: resType,
            amount: amount,
            src_floor: src_floor,
            tgt_cell: tgt_cell,
            room: room,
            timestamp: Memory.timestamp++
        };
        return task;
    },
    pushTask: function(room,src,tgt,resType,amount,src_floor = 0,tgt_cell = -1){
        if(global[room] == undefined) this.init(room);
        let task = this.constructor(room,src,tgt,resType,amount,src_floor,tgt_cell);
        global[room].expressQueue.push(task);

        this.registerGlobal(task.timestamp);
        return task.timestamp;
    },
    recycleTask: function(task){
        let room = task.room;
        let tgt = Game.getObjectById(task.tgt);
        let resType = task.resType;
        let amount = task.amount;
        let err = !room?'0':'1'+!tgt?'0':'1'+!resType?'0':'1'+!amount?'0':'1'+!task.timestamp?'0':'1';
        if(!room || !tgt || !resType || !amount || !task.timestamp){ console.log('Recycling Invalid ExpressTask! Err:'+err); return err;};
        if(global[room] == undefined) this.init(room);
        global[room].expressQueue.push(task);
        
        this.cancelMemory(task.timestamp);
        this.registerGlobal(task.timestamp);
        return task.timestamp;
    },
    deleteTask: function(room,timestamp){
        if(global[room] == undefined) this.init(room);
        else{
            let index = global[room].expressQueue.findIndex((tmp_task)=>{return tmp_task.timestamp == timestamp;});
            if(index != -1) global[room].expressQueue.splice(index,1);

            this.cancelGlobal(timestamp);
        }
    },
    showTask: function(room){
        if(global[room] == undefined) console.log('Nothing in '+room+' expressing!');
        else{
            for(let it_task of global[room].expressQueue){
                let src = Game.getObjectById(it_task.src);
                let tgt = Game.getObjectById(it_task.tgt);
                console.log('-----------------------------------------');
                console.log('Task #'+it_task.timestamp+' in '+it_task.room);
                console.log('src: '+it_task.src+' at ('+src.pos.x+','+src.pos.y+') upon '+it_task.src_floor);
                let tgt_cell = (it_task.tgt_cell==-1)?tgt.store.getCapacity(it_task.resType):it_task.tgt_cell;
                console.log('tgt: '+it_task.tgt+' at ('+tgt.pos.x+','+tgt.pos.y+') below '+tgt_cell);
                console.log('resType: '+it_task.resType+'    amount: '+it_task.amount);
            }   console.log('------------------End--------------------');
        }
    },
    analyRawTask: function(room, src_id, tgt_id, resType, amount, timestamp=0,src_floor=0,tgt_cell=-1){
        let src = Game.getObjectById(src_id);
        let tgt = Game.getObjectById(tgt_id);
        let src_Type,tgt_Type;
        if(src.structureType) src_Type = src.structureType;
        else if(src.destroyTime) src_Type = src.structure.structureType+"_ruin";
        else if(src.deathTime) src_Type = "tombstone";
        if(tgt.structureType) tgt_Type = tgt.structureType;
        else if(tgt.destroyTime) tgt_Type = tgt.structure.structureType+"_ruin";
        else if(tgt.deathTime) tgt_Type = "tombstone";
        switch(resType){
            case 'utrium_bar': resType = 'U_bar'; break;
            case 'lemergium_bar': resType = 'L_bar'; break;
            case 'zynthium_bar': resType = 'Z_bar'; break;
            case 'keanium_bar': resType = 'K_bar'; break;
            case 'ghodium_melt': resType = 'G_bar'; break;
            case 'oxidant': resType = 'O_bar'; break;
            case 'reductant': resType = 'H_bar'; break;
            case 'purifier': resType = 'X_bar'; break;
        }
        console.log('Task#'+timestamp+'_Room'+room+':  From '+src_Type+'>'+src_floor+' to '+tgt_Type+'(<'+tgt_cell==-1?tgt.store.getCapacity(resType):tgt_cell+') expressing '+amount+'x '+resType);
    },
    analyTask: function(task){
        let room = task.room;
        let src = Game.getObjectById(task.src);
        let tgt = Game.getObjectById(task.tgt);
        let resType = task.resType;
        let amount = task.amount;
        let timestamp = task.timestamp;
        let src_floor = task.src_floor;
        let tgt_cell = task.tgt_cell;
        let err = !room?'0':'1'+!tgt?'0':'1'+!resType?'0':'1'+!amount?'0':'1'+!timestamp?'0':'1';
        if(!room || !tgt || !resType || !amount ||!timestamp){ console.log('Invalid ExpressTask! Err:'+err); return err;};
        let src_Type,tgt_Type;
        if(src.structureType) src_Type = src.structureType;
        else if(src.destroyTime) src_Type = src.structure.structureType+"_ruin";
        else if(src.deathTime) src_Type = "tombstone";
        if(tgt.structureType) tgt_Type = tgt.structureType;
        else if(tgt.destroyTime) tgt_Type = tgt.structure.structureType+"_ruin";
        else if(tgt.deathTime) tgt_Type = "tombstone";
        switch(resType){
            case 'utrium_bar': resType = 'U_bar'; break;
            case 'lemergium_bar': resType = 'L_bar'; break;
            case 'zynthium_bar': resType = 'Z_bar'; break;
            case 'keanium_bar': resType = 'K_bar'; break;
            case 'ghodium_melt': resType = 'G_bar'; break;
            case 'oxidant': resType = 'O_bar'; break;
            case 'reductant': resType = 'H_bar'; break;
            case 'purifier': resType = 'X_bar'; break;
        }
        console.log('Task#'+timestamp+'_Room'+room+':  From '+src_Type+'>'+src_floor+' to '+tgt_Type+'(<'+tgt_cell==-1?tgt.store.getCapacity(resType):tgt_cell+') expressing '+amount+'x '+resType);
    },
    checkTask: function(room,timestamp){
        return ((global.timestamp && global.timestamp.includes(timestamp)) || Memory.timestamp_hash.includes(timestamp));
    },
    keepUpon: function(room,obj_id,pool_id,resType,amount,interval){
        /**
         *  Memory.hash = {,,,'id': timestamp ,,,}
         * 1: checkTask
         * 2: if(no) pushTask 
         *    else return
         * keep Upon: lower than send more here
         * room,src,tgt,resType,amount,src_floor = 0,tgt_cell = -1
         */
        let hashkey = 'kU'+obj_id+resType+amount+pool_id;
        let timestamp = -1;
        if(Memory.hash[hashkey]) timestamp = Memory.hash[hashkey];

        if(timestamp == -1 || !this.checkTask(room,timestamp)){
            timestamp = this.pushTask(room,pool_id,obj_id,resType,interval,0,amount);
            Memory.hash[hashkey] = timestamp;
        }
    },
    keepBelow: function(room,obj_id,pool_id,resType,amount,interval){
        let hashkey = 'kB'+obj_id+resType+amount+pool_id;
        let timestamp = -1;
        if(Memory.hash[hashkey]) timestamp = Memory.hash[hashkey];

        if(timestamp == -1 || !this.checkTask(room,timestamp)){
            timestamp = this.pushTask(room,obj_id,pool_id,resType,interval,amount);
            Memory.hash[hashkey] = timestamp;
        }
    },
    registerGlobal: function(timestamp){
        if(global.timestamp) {
            if(global.timestamp.includes(timestamp)) return 'Exist';
            else global.timestamp.push(timestamp);
        }else{
            global.timestamp = new Array();
            global.timestamp.push(timestamp);
        }return 0;
    },
    cancelGlobal: function(timestamp){
        if(global.timestamp){
            if(global.timestamp.includes(timestamp)){
                let index = global.timestamp.findIndex((i)=>{return i==timestamp;});
                global.timestamp.splice(index,1);
            }else return 'NoHere';
        }else return 'NoArray';
        return 0;
    },
    registerMemory: function(timestamp){
        if(Memory.timestamp_hash){
            if(Memory.timestamp_hash.includes(timestamp)) return 'Exist';
            else Memory.timestamp_hash.push(timestamp);
        }else{
            Memory.timestamp_hash = new Array();
            Memory.timestamp_hash.push(timestamp);
        }return 0;
    },
    cancelMemory: function(timestamp){
        if(Memory.timestamp_hash){
            if(Memory.timestamp_hash.includes(timestamp)){
                let index = Memory.timestamp_hash.findIndex((i)=>{return i==timestamp;});
                Memory.timestamp_hash.splice(index,1);
            }else return 'NoHere';
        }else return 'NoArray';
        return 0;
    }
};

/*
require('task.express').pushTask('W35N28','5dbbb8ec519fd03f96e156f5','5e2bdda72d333ad2a679df8f','energy',24129);
require('task.express').pushTask('W35N28','5dbbb8ec519fd03f96e156f5','5e35aa8a083099019e3040ae','power',223);
*/