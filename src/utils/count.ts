export function count(arr: any, nameLabel: any, countLabel: any) {
  var counts: any = {};
  nameLabel = nameLabel || "value";
  countLabel = countLabel || "count";

  arr.forEach(function (value: any) {
    if (typeof value !== "string") return;
    counts[value] ? counts[value]++ : (counts[value] = 1);
  });

  return Object.keys(counts)
    .map(function (key) {
      var obj: any = {};
      obj[nameLabel] = key;
      obj[countLabel] = counts[key];
      return obj;
    })
    .sort(function (a, b) {
      return b[countLabel] - a[countLabel];
    });
}
