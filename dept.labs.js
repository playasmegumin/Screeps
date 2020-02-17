var config_labs = {
    W35N28: {
        0: { id:'5e039e4be697d726417af1ba', type:'LO' },
        1: { id:'5e24a23a934307446658e5d8', type:'LO' },
        2: { id:'5e24c394395703230176d430', type:'L'},
        3: { id:'5e2512865055cf8867179aa8', type:'LO'},
        4: { id:'5e253e2e3849331eb6ba8156', type:'LO'},
        5: { id:'5dfb9af3101cfe13b4c3f0e9', type:'LO'},
        6: { id:'5dfc397a9e776e5090d24a06', type:'LO'},
        7: { id:'5dfcf268f9f7f331ed7b92c5', type:'O'},
        8: { id:'5e2480ec2143f1dd03462e0f', type:'LO'},
        9: { id:'5e24e543e697d7ad6b8862ae', type:'LO'}
    }
};

module.exports = {
    produce_LO: function(){
        var lab0 = Game.getObjectById(config_labs['W35N28'][0].id);
        var lab1 = Game.getObjectById(config_labs['W35N28'][1].id);
        var lab2 = Game.getObjectById(config_labs['W35N28'][2].id);
        var lab3 = Game.getObjectById(config_labs['W35N28'][3].id);
        var lab4 = Game.getObjectById(config_labs['W35N28'][4].id);
        var lab5 = Game.getObjectById(config_labs['W35N28'][5].id);
        var lab6 = Game.getObjectById(config_labs['W35N28'][6].id);
        var lab7 = Game.getObjectById(config_labs['W35N28'][7].id);
        var lab8 = Game.getObjectById(config_labs['W35N28'][8].id);
        var lab9 = Game.getObjectById(config_labs['W35N28'][9].id);
        
        //if(lab2.store['LO'] > 0 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'L2tL8LO';
        if(lab2.store['LO'] == 0 && Memory.creeps['W35N28'].task == 'L2tL8LO') Memory.creeps['W35N28'].task = null;
        //if(lab7.store['LO'] > 0 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'L7tL9LO';
        if(lab7.store['LO'] == 0 && Memory.creeps['W35N28'].task == 'L7tL9LO') Memory.creeps['W35N28'].task = null;

        //if(lab0.store['L'] > 0 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'L0tL2L';
        if(lab0.store['L'] == 0 && Memory.creeps['W35N28'].task == 'L0tL2L') Memory.creeps['W35N28'].task = null;
        //if(lab1.store['O'] > 0 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'L1tL7O';
        if(lab1.store['O'] == 0 && Memory.creeps['W35N28'].task == 'L1tL7O') Memory.creeps['W35N28'].task = null;

        if(lab0.store['energy'] < 2000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL0e';
        if(lab0.store['energy'] >= 2000 && Memory.creeps['W35N28'].task == 'StL0e') Memory.creeps['W35N28'].task = null;
        if(lab1.store['energy'] < 2000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL1e';
        if(lab1.store['energy'] >= 2000 && Memory.creeps['W35N28'].task == 'StL1e') Memory.creeps['W35N28'].task = null;
        if(lab2.store['energy'] < 2000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL2e';
        if(lab2.store['energy'] >= 2000 && Memory.creeps['W35N28'].task == 'StL2e') Memory.creeps['W35N28'].task = null;
        if(lab3.store['energy'] < 2000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL3e';
        if(lab3.store['energy'] >= 2000 && Memory.creeps['W35N28'].task == 'StL3e') Memory.creeps['W35N28'].task = null;
        if(lab4.store['energy'] < 2000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL4e';
        if(lab4.store['energy'] >= 2000 && Memory.creeps['W35N28'].task == 'StL4e') Memory.creeps['W35N28'].task = null;
        if(lab5.store['energy'] < 2000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL5e';
        if(lab5.store['energy'] >= 2000 && Memory.creeps['W35N28'].task == 'StL5e') Memory.creeps['W35N28'].task = null;
        if(lab6.store['energy'] < 2000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL6e';
        if(lab6.store['energy'] >= 2000 && Memory.creeps['W35N28'].task == 'StL6e') Memory.creeps['W35N28'].task = null;
        if(lab7.store['energy'] < 2000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL7e';
        if(lab7.store['energy'] >= 2000 && Memory.creeps['W35N28'].task == 'StL7e') Memory.creeps['W35N28'].task = null;
        if(lab8.store['energy'] < 2000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL8e';
        if(lab8.store['energy'] >= 2000 && Memory.creeps['W35N28'].task == 'StL8e') Memory.creeps['W35N28'].task = null;

        //if(lab2.store['L'] < 3000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL2L';
        if(lab2.store['L'] >= 2500 && Memory.creeps['W35N28'].task == 'StL2L') Memory.creeps['W35N28'].task = null;
        //if(lab7.store['O'] < 3000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL7O';
        if(lab7.store['O'] >= 2500 && Memory.creeps['W35N28'].task == 'StL7O') Memory.creeps['W35N28'].task = null;

        //if(lab0.store['L'] < 3000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL0L';
        //if(lab0.store['L'] >= 3000 && Memory.creeps['W35N28'].task == 'StL0L') Memory.creeps['W35N28'].task = null;
        //if(lab1.store['O'] < 3000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL1O';
        //if(lab1.store['O'] >= 3000 && Memory.creeps['W35N28'].task == 'StL1O') Memory.creeps['W35N28'].task = null;
        
        lab0.runReaction(lab2,lab7);
        lab1.runReaction(lab2,lab7);
        lab3.runReaction(lab2,lab7);
        lab4.runReaction(lab2,lab7);
        lab5.runReaction(lab2,lab7);
        lab6.runReaction(lab2,lab7);
        lab8.runReaction(lab2,lab7);
        lab9.runReaction(lab2,lab7);
    },
    boostLO: function(labnumber, creep){
        var lab = Game.getObjectById(config_labs['W35N28'][labnumber].id);
        if(creep.pos.isNearTo(lab)){
            if(lab.store['LO'] >= 600) return lab.boostCreep(creep);
        }else creep.moveTo(lab,{reuse:200});
    }
};