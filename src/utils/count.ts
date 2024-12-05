type CountItemTypes = {
  count: number;
  id: string;
};

type CountTypes = {
  [key: string]: CountItemTypes;
  item: CountItemTypes;
};

type ItemsTypes = {
  item: string;
  trackID: string;
};

type ObjTypes = {
  itemName: string;
  playCount: string;
  trackID: string;
};

export function count(
  arr: ItemsTypes[],
  nameLabel: string,
  countLabel: string,
  trackLabel: string
) {
  const counts: CountTypes = {
    item: {
      id: "",
      count: 0,
    },
  };
  nameLabel = nameLabel || "value";
  countLabel = countLabel || "count";
  trackLabel = trackLabel || "id";

  arr.forEach((value: ItemsTypes) => {
    counts[value.item as keyof CountTypes]
      ? (counts[value.item as keyof CountTypes] = {
          count: counts[value.item as keyof CountTypes].count + 1,
          id: value.trackID.slice(14),
        })
      : (counts[value.item as keyof CountTypes] = {
          count: 1,
          id: value.trackID.slice(14),
        });
  });

  return Object.keys(counts)
    .map((key: string) => {
      const obj: ObjTypes = {
        itemName: "",
        playCount: "",
        trackID: "",
      };
      obj[nameLabel as keyof ObjTypes] = key;
      obj[countLabel as keyof ObjTypes] = counts[key].count.toString();
      obj[trackLabel as keyof ObjTypes] = counts[key].id;
      return obj;
    })
    .sort((a, b) => {
      return (
        Number(b[countLabel as keyof ObjTypes]) -
        Number(a[countLabel as keyof ObjTypes])
      );
    });
}
