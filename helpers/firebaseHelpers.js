export const snapshotToArray = snapshot => {
    let returnArray = [];

    snapshot.forEach((childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArray.push(item);
    }));

    return returnArray;
};