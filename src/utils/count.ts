export function count(arr: any, nameLabel: string, countLabel: string) {
  const counts: any = {};
  // const trackIDs: any = {};
  nameLabel = nameLabel || "value";
  countLabel = countLabel || "count";

  arr.forEach((value: any) => {
    // if (typeof value !== "string") return;
    counts[value.item]
      ? counts[value.item].count++
      : (counts[value.item] = { count: 1, id: value.trackID });
    // trackIDs[value.item] = value.trackID;
  });

  console.log(counts);

  return Object.keys(counts)
    .map((key: any) => {
      const obj: any = {};
      obj[nameLabel] = key;
      obj[countLabel] = counts[key].count;
      obj["trackID"] = counts[key].id.slice(14);
      return obj;
    })
    .sort((a, b) => {
      return b[countLabel] - a[countLabel];
    });
}
