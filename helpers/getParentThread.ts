import type { CastProps } from "components";

/**
 * Get the parent thread of a cast
 * @param casts - all casts
 * @param hash - the hash of the cast to find the parent thread of
 * @returns an array of casts that make up the parent thread
 */
export function getParentThread(casts: CastProps[], hash: string): CastProps[] {
  // find the cast
  const cast = casts.find((cast) => cast.hash === hash) as CastProps;
  // get the initial parent
  let parentToCheck = cast?.parentHash;
  // create an array to store the casts in
  let arr: CastProps[] = [];
  // loop through the parents until there are no more
  while (parentToCheck) {
    // see if the parent exists
    const parent = casts.find(({ hash }) => parentToCheck === hash);
    // if it doesn't then stop the loop
    if (!parent) parentToCheck = null;
    // if it does, add it to the array and move to its parent
    if (parent) {
      // add to the start of the array so that the order is correct
      arr = [parent, ...arr];
      parentToCheck = parent.parentHash;
    } else {
      parentToCheck = null;
    }
  }
  // add the cast to the array
  arr.push(cast);
  // find the children of the cast
  const children = casts.filter((cast) => cast.parentHash === hash);
  // add the children to the array
  children.forEach((r) => arr.push(r));
  // return the array
  return arr;
}
