let buildArr = [];
let id = 0;

var roadBuilder = {

    /** @param {Creep} creep **/
    run: function(spawn) {
        //console.log(spawn.pos)
        let sources = spawn.pos.findClosestByRange(FIND_SOURCES)
        let terran = spawn.room.getTerrain();
        //console.log(terran.get(sources.pos))
        //console.log(sources.pos);
        let s1 = sources.pos;
        let sp = spawn.pos;
        let newX = s1.x;
        let newY = s1.y;
        let end = true;
        
        let goals = _.map(spawn.room.find(FIND_SOURCES), function(source) {
            // We can't actually walk on sources-- set `range` to 1 
            // so we path next to it.
            return { pos: source.pos, range: 1 };
         });

        let road = PathFinder.search(spawn.pos, goals);
        console.log(road)
    
        if (!buildArr.length){
            while(end){
                if (newX === sp.x && newY === sp.y){
                    end = false;
                }else{
                    buildArr.push({ type: 'road', coord: { x: newX, y: newY}, id: id, stat: 'build' })
                }
                if (newX > sp.x){
                    newX -= 1;
                }else if (newX < sp.x){
                    newX += 1;
                }
                if (newY > sp.y){
                    newY -= 1; 
                }else if (newY < sp.y){
                    newY += 1;
                }
            }
            buildAround(spawn, spawn.pos);
        }
        
        //console.log(buildArr[0].coord.x)
        
        
        /*if (buildArr.length){
            buildArr.forEach( row => {
                if (spawn.room.createConstructionSite((row.coord.x), (row.coord.y), STRUCTURE_ROAD)){
                    spawn.room.createConstructionSite(row.coord.x, row.coord.y, STRUCTURE_ROAD)
                }
            })
        }*/
        
        /*if (spn.room.createConstructionSite(spn.pos.x + 2, spn.pos.y + 2, STRUCTURE_ROAD)){
            spn.room.createConstructionSite(spn.pos.x + 2, spn.pos.y + 2, STRUCTURE_ROAD)
        }*/
        
    }
}

const buildAround = (spawn, coord) => {
    //buildArr.push({ type: 'road', coord: { x: (coord.x + 1), y: (coord.y + 1)}, id: id, stat: 'build' })

    buildArr.push({ type: 'road', coord: { x: (coord.x), y: (coord.y + 1)}, id: id, stat: 'build' })
    
    //buildArr.push({ type: 'road', coord: { x: (coord.x + 1), y: (coord.y - 1)}, id: id, stat: 'build' })
    
    buildArr.push({ type: 'road', coord: { x: (coord.x - 1), y: (coord.y)}, id: id, stat: 'build' })
    
    //buildArr.push({ type: 'road', coord: { x: (coord.x - 1), y: (coord.y - 1)}, id: id, stat: 'build' })
    
    buildArr.push({ type: 'road', coord: { x: (coord.x), y: (coord.y - 1)}, id: id, stat: 'build' })
    
    //buildArr.push({ type: 'road', coord: { x: (coord.x - 1), y: (coord.y + 1)}, id: id, stat: 'build' })
    buildArr.push({ type: 'road', coord: { x: (coord.x + 1), y: (coord.y)}, id: id, stat: 'build' })
    
    //buildArr.push({ type: 'road', coord: { x: (coord.x + 1), y: (coord.y + 1)}, id: id, stat: 'build' })
    //buildArr.push({ type: 'road', coord: { x: (coord.x + 1), y: (coord.y + 1)}, id: id, stat: 'build' })

}

module.exports = roadBuilder;