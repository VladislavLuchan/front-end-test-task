import { CatModel } from "../services/catsService";

const countOrigin = (cats: CatModel[]) => {
  const originCount: Record<string, number> = {};
  cats.forEach((cat) => {
    if (cat.origin) {
      originCount[cat.origin] = (originCount[cat.origin] || 0) + 1;
    }
  });
  return Object.entries(originCount).map(([origin, count]) => ({
    name: origin,
    value: count,
  }));
};

export { countOrigin };
