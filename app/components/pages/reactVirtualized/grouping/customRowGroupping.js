const groupList = (list, column, level, path) => {
    const map = {};
    const grouppedList = [];

    for (let i = 0; i < list.length; i++) {
        const obj = list[i];
        const field = obj[column];

        if (!map[field]) {
            map[field] = '';
        }
    }

    Object.keys(map).forEach((key) => {
        grouppedList.push({
            name: key,
            sysMeta: {
                level,
                path: path ? path.concat([key]) : [key],
                collapsed: true,
            },
        });
    });

    return grouppedList;
};

const groupByChanged = (groupBy, grouppedBy) => {
    if (!groupBy && !grouppedBy) {
        return false;
    }

    if (!groupBy || !grouppedBy) {
        return true;
    }

    if (groupBy.length !== grouppedBy.length) {
        return true;
    }

    for (let i = 0; i < groupBy.length; i++) {
        if (groupBy[i] !== grouppedBy[i]) {
            return true;
        }
    }

    return false;
};

const samePath = (source, target) => {
    if (!source || !target) {
        return false;
    }

    if (source.length !== target.length) {
        return false;
    }

    for (let i = 0; i < source.length; i++) {
        if (source[i] !== target[i]) {
            return false;
        }
    }

    return true;
};

const expandList = ({ list, grouppedList, groupBy, toggleBy, toggledGroup }) => {
    
    let parentList = list;
    let childList = [];

    for (let level = 0; level <= toggleBy.level; level++) {
        const key = groupBy[level];
        const value = toggleBy.path[level];

        for (let i = 0; i < parentList.length; i++) {
            const obj = parentList[i];

            if (String(obj[key]) === String(value)) {
                childList.push(obj);
            }
        }

        parentList = childList;
        childList = [];
    }

    if (groupBy.length > (toggleBy.level + 1)) {
        const level = toggleBy.level + 1;
        parentList = groupList(parentList, groupBy[level], level, toggleBy.path);
    }

    const index = grouppedList.indexOf(toggledGroup);
    const st = grouppedList.slice(0, index + 1);
    const en = grouppedList.slice(index + 1, grouppedList.length);
    const rs = st.concat(parentList).concat(en);

    return rs;
};

const isCollapsedGroup = (sourcePath, targetPath) => {
    if (sourcePath.length <= targetPath.length) {
        return false;
    }

    for (let i = 0; i < targetPath.length; i++) {
        if (sourcePath[i] !== targetPath[i]) {
            return false;
        }
    }

    return true;
};

const isCollapsedObject = (obj, groupBy, targetPath) => {
    if (groupBy.length < targetPath.length) {
        return true;
    }

    for (let i = 0; i < targetPath.length; i++) {
        const key = groupBy[i];
        const val = obj[key];

        if (String(val) !== String(targetPath[i])) {
            return false;
        }
    }

    return true;
};

const collapseList = (list, grouppedList, groupBy, toggleBy) => {
    const collapsedRows = [];

    for (let i = 0; i < grouppedList.length; i++) {
        const obj = grouppedList[i];

        if (obj.sysMeta) {
            if (isCollapsedGroup(obj.sysMeta.path, toggleBy.path)) {
                collapsedRows.push(obj);
            }
        } else {
            if (isCollapsedObject(obj, groupBy, toggleBy.path)) {
                collapsedRows.push(obj);
            }
        }
    }

    const newGrouppedList = [];

    for (let i = 0; i < grouppedList.length; i++) {
        const obj = grouppedList[i];

        if (collapsedRows.indexOf(obj) < 0) {
            newGrouppedList.push(obj);
        }
    }

    return newGrouppedList;
};

const toggleList = (list, grouppedList, groupBy, toggleBy) => {
    let toggledGroup = null;
    let toggleListResult = grouppedList;

    for (let i = 0; i < grouppedList.length; i++) {
        const obj = grouppedList[i];

        if (!obj.sysMeta) {
            continue;
        }

        if (obj.sysMeta.level !== toggleBy.level) {
            continue;
        }

        if (samePath(obj.sysMeta.path, toggleBy.path)) {
            toggledGroup = obj;
            break;
        }
    }

    if (toggledGroup) {
        if (toggledGroup.sysMeta.collapsed) {
            toggledGroup.sysMeta.collapsed = false;
            toggleListResult = expandList({ list, grouppedList, groupBy, toggleBy, toggledGroup });
        } else {
            toggledGroup.sysMeta.collapsed = true;
            toggleListResult = collapseList(list, grouppedList, groupBy, toggleBy);
        }
    }

    return toggleListResult;
};

const group = (groupInfo) => {
    if (!groupInfo) {
        return {
            grouppedList: [],
            grouppedBy: null,
            toggledBy: null,
        };
    }

    const list = groupInfo.list;

    if (!list || !list.length) {
        return {
            grouppedList: [],
            grouppedBy: null,
            toggledBy: null,
        };
    }

    let grouppedList = groupInfo.grouppedList;
    const groupBy = groupInfo.groupBy;
    const grouppedBy = groupInfo.grouppedBy;
    const toggleBy = groupInfo.toggleBy;

    if (!groupBy || !groupBy.length) {
        return {
            grouppedList: list,
            grouppedBy: null,
            toggledBy: null,
        };
    }

    if (groupByChanged(groupBy, grouppedBy)) {
        grouppedList = groupList(list, groupBy[0], 0, null);

        return {
            grouppedList,
            grouppedBy: groupBy,
            toggledBy: null,
        };
    }

    if (toggleBy) {
        grouppedList = toggleList(list, grouppedList, groupBy, toggleBy);

        return {
            grouppedList,
            grouppedBy: groupBy,
            toggledBy: toggleBy,
        };
    }

    return {
        grouppedList,
        grouppedBy: groupBy,
        toggledBy: toggleBy,
    };
};

/*
const testGroupping = (data) => {
    let grouppedInfo = group({
        list: data,
        groupBy: ['firstName'],
    });

    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['country'],
        grouppedBy: grouppedInfo.grouppedBy,
    });

    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['country'],
        grouppedBy: grouppedInfo.grouppedBy,
        toggleBy: {
            level: 0,
            path: ['USA'],
        },
    });

    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['country'],
        grouppedBy: grouppedInfo.grouppedBy,
        toggleBy: {
            level: 0,
            path: ['USA'],
        },
    });

    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['firstName', 'country'],
        grouppedBy: grouppedInfo.grouppedBy,
        toggleBy: {
            level: 0,
            path: ['Duke'],
        },
    });

    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['firstName', 'country'],
        grouppedBy: grouppedInfo.grouppedBy,
        toggleBy: {
            level: 0,
            path: ['Duke'],
        },
    });

    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['firstName', 'country'],
        grouppedBy: grouppedInfo.grouppedBy,
        toggleBy: {
            level: 1,
            path: ['Duke', 'USA'],
        },
    });

    grouppedInfo = group({
        list: data,
        grouppedList: grouppedInfo.grouppedList,
        groupBy: ['firstName', 'country'],
        grouppedBy: grouppedInfo.grouppedBy,
        toggleBy: {
            level: 1,
            path: ['Duke', 'USA'],
        },
    });

    return grouppedInfo;
};
*/

export default function customRowGroupping(groupInfo) {
    const grouppedInfo = group(groupInfo);
    const rr =  Object.assign({}, groupInfo, grouppedInfo);
    return rr;
}
