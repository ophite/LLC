function groupList(list, column, level, path){

    var map = {};
    var grouppedList = [];
    
    for(var i = 0; i < list.length; i++){
        var obj = list[i];
        var field = obj[column];
        
        if(!map[field]){
            map[field] = "";
        }
    }
    
    Object.keys(map).forEach(function(key){
        grouppedList.push({
            name: key,
            _meta: {
                level: level,
                path: path ? path.concat([key]) : [key],
                collapsed: true
            }
        });
    });
    
    return grouppedList;
}

function groupByChanged(groupBy, grouppedBy){
    if(!groupBy && !grouppedBy)
        return false;
        
    if(!groupBy || !grouppedBy)
        return true;
        
    if(groupBy.length != grouppedBy.length)
        return true;
        
    for(var i = 0; i < groupBy.length; i++){
        if(groupBy[i] !== grouppedBy[i])
            return true;
    }
    
    return false;
}

function samePath(source, target){

    if(!source || !target)
        return false;
        
    if(source.length != target.length)
        return false;
        
    for(var i = 0; i < source.length; i++){
        if(source[i] !== target[i])
            return false;
    }
    
    return true;
}

function expandList(list, grouppedList, groupBy, toggleBy, toggledGroup){
    
    var parentList = list;
    var childList = [];

    for(var level = 0; level <= toggleBy.level; level++){
        var key = groupBy[level];
        var value = toggleBy.path[level];
        
        for(var i = 0; i < parentList.length; i++){
            var obj = parentList[i];
            
            if(obj[key] === value)
                childList.push(obj);
        }
        
        parentList = childList;
        childList = [];
    }
    
    if(groupBy.length > (toggleBy.level + 1)){
        var level = toggleBy.level + 1;
        parentList = groupList(parentList, groupBy[level], level, toggleBy.path);
    }
    
    var index = grouppedList.indexOf(toggledGroup);
    var st = grouppedList.slice(0, index + 1);
    var en = grouppedList.slice(index + 1, grouppedList.length);
    var rs = st.concat(parentList).concat(en);
    
    return rs;
}

function isCollapsedGroup(sourcePath, targetPath){
    if(sourcePath.length <= targetPath.length)
        return false;
        
    for(var i = 0; i < targetPath.length; i++){
        if(sourcePath[i] !== targetPath[i])
            return false;
    }
    
    return true;
}

function isCollapsedObject(obj, groupBy, targetPath){
    if(groupBy.length < targetPath.length)
        return true;
        
    for(var i = 0; i < targetPath.length; i++){
        var key = groupBy[i];
        var val = obj[key];
        
        if(val !== targetPath[i])
            return false;
    }
    
    return true;
}

function collapseList(list, grouppedList, groupBy, toggleBy, toggledGroup){
    
    var collapsedRows = [];
    
    for(var i = 0; i < grouppedList.length; i++){
        var obj = grouppedList[i];
        
        if(obj._meta){
            if(isCollapsedGroup(obj._meta.path, toggleBy.path))
                collapsedRows.push(obj);
        }else{
            if(isCollapsedObject(obj, groupBy, toggleBy.path))
                collapsedRows.push(obj);
        }
    }
    
    var newGrouppedList = [];
    
    for(var i = 0; i < grouppedList.length; i++){
        var obj = grouppedList[i];
        
        if(collapsedRows.indexOf(obj) < 0)
            newGrouppedList.push(obj);
    }
    
    return newGrouppedList;
}

function toggleList(list, grouppedList, groupBy, toggleBy){
    
    var toggledGroup = null;

    for(var i = 0; i < grouppedList.length; i++){
        var obj = grouppedList[i];
        
        if(!obj._meta)
            continue;

        if(obj._meta.level !== toggleBy.level)
            continue;
            
        if(samePath(obj._meta.path, toggleBy.path)){
            toggledGroup = obj;
            break;
        }
    }
    
    if(toggledGroup){
        if(toggledGroup._meta.collapsed){
            toggledGroup._meta.collapsed = false;
            return expandList(list, grouppedList, groupBy, toggleBy, toggledGroup);
        }
        else{
            toggledGroup._meta.collapsed = true;
            return collapseList(list, grouppedList, groupBy, toggleBy, toggledGroup);
        }
    }
    
    return grouppedList;
}

function group(groupInfo){

    if(!groupInfo){
        return {
            grouppedList: [],
            grouppedBy: null,
            toggledBy: null
        }
    }

    var list = groupInfo.list;
    
    if(!list || !list.length){
        return {
            grouppedList: [],
            grouppedBy: null,
            toggledBy: null
        }
    }

    var grouppedList = groupInfo.grouppedList;
    var groupBy = groupInfo.groupBy;
    var grouppedBy = groupInfo.grouppedBy;
    var toggleBy = groupInfo.toggleBy;
    
    if(!groupBy || !groupBy.length){
        return {
            grouppedList: list,
            grouppedBy: null,
            toggledBy: null
        }
    }

    if(groupByChanged(groupBy, grouppedBy)){
        grouppedList = groupList(list, groupBy[0], 0, null);
        
        return {
            grouppedList: grouppedList,
            grouppedBy: groupBy,
            toggledBy: null
        }
    }
    
    if(toggleBy){
        grouppedList = toggleList(list, grouppedList, groupBy, toggleBy);
        
        return {
            grouppedList: grouppedList,
            grouppedBy: groupBy,
            toggledBy: toggleBy
        }
    }
    
    return {
        grouppedList: grouppedList,
        grouppedBy: groupBy,
        toggledBy: toggleBy
    } 
}

function testGroupping(data){
    var grouppedInfo = group({
        list: data,
        groupBy: ['firstName']
    });
    
    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['country'],
        grouppedBy: grouppedInfo.grouppedBy
    });
    
    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['country'],
        grouppedBy: grouppedInfo.grouppedBy,
        toggleBy: {
            level: 0,
            path: ['USA']
        }
    });
    
    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['country'],
        grouppedBy: grouppedInfo.grouppedBy,
        toggleBy: {
            level: 0,
            path: ['USA']
        }
    });
    
    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['firstName', 'country'],
        grouppedBy: grouppedInfo.grouppedBy,
        toggleBy: {
            level: 0,
            path: ['Duke']
        }
    });

    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['firstName', 'country'],
        grouppedBy: grouppedInfo.grouppedBy,
        toggleBy: {
            level: 0,
            path: ['Duke']
        }
    });

    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['firstName', 'country'],
        grouppedBy: grouppedInfo.grouppedBy,
        toggleBy: {
            level: 1,
            path: ['Duke', 'USA']
        }
    });

    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['firstName', 'country'],
        grouppedBy: grouppedInfo.grouppedBy,
        toggleBy: {
            level: 1,
            path: ['Duke', 'USA']
        }
    });
    
    return grouppedInfo;
}

export default function customRowGroupping(groupInfo){
    var grouppedInfo = group(groupInfo);
    return Object.assign({}, groupInfo, grouppedInfo);
}