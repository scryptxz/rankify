type CountItemTypes = {
  count: number;
  id: string;
};

type CountTypes = {
  [key: string]: CountItemTypes;
};

type ItemsTypes = {
  item: string;
  trackID: string;
};

type ObjTypes = {
  itemName: string;
  playCount: number;
  trackID: string;
};

export function count(arr: ItemsTypes[]) {
  const counts: CountTypes = {};

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
        itemName: key,
        playCount: counts[key].count,
        trackID: counts[key].id,
      };
      return obj;
    })
    .sort((a, b) => {
      return b.playCount - a.playCount;
    });
}
