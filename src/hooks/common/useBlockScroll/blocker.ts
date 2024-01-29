export interface IBlocker {
  block(): boolean;
  unblock(): boolean;
  canBlock(): boolean;
}

export type IBlockers = Set<IBlocker>;

export const Blocker = (element: HTMLElement, blockers = Blockers(element)) => {
  const blocker = {
    block() {
      const willBlock = blockers.size === 0;

      if (willBlock) {
        element.style.overflow = 'hidden';
      }

      blockers.add(blocker);

      return willBlock;
    },
    unblock() {
      blockers.delete(blocker);

      if (blockers.size === 0) {
        element.style.overflow = '';
      }

      return blockers.size === 0;
    },
    canBlock() {
      return blockers.size === 0;
    },
  };

  return blocker;
};

const blockersName = Symbol('blockers');

export const Blockers = (element: HTMLElement): IBlockers => {
  const elementWithBlockers = element as HTMLElement & {
    [blockersName]: IBlockers | undefined;
  };

  if (elementWithBlockers[blockersName] === undefined) {
    elementWithBlockers[blockersName] = new Set();
  }

  return elementWithBlockers[blockersName];
};
