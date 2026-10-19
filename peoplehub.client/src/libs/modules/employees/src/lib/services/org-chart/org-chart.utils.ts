import type { ChipVariant } from 'ui';
import { OrgForest, OrgNode, OrgPerson } from '../../models/org-chart.model';

/**
 * Builds the tree. People whose manager is missing (or who sit in a reporting loop) become roots,
 * so nobody ever disappears from the chart.
 */
export function buildForest(people: OrgPerson[]): OrgForest {
  const byId = new Map<string, OrgNode>();
  for (const p of people) byId.set(p.employeeId, { person: p, children: [], depth: 0, total: 0 });

  const parentOf = (id: string): string => {
    const m = byId.get(id)?.person.managerId ?? '';
    return m && m !== id && byId.has(m) ? m : '';
  };

  // Cut loops: walk up from each person; if we come back to someone already on the path, cut there.
  const cut = new Set<string>();
  for (const p of people) {
    const seen = new Set<string>();
    let cur = p.employeeId;
    while (cur) {
      if (seen.has(cur)) {
        const loop = [...seen].slice([...seen].indexOf(cur));
        cut.add(loop.sort()[0]);
        break;
      }
      seen.add(cur);
      const next = parentOf(cur);
      cur = next && !cut.has(cur) ? next : '';
    }
  }

  const roots: OrgNode[] = [];
  for (const node of byId.values()) {
    const parent = cut.has(node.person.employeeId) ? '' : parentOf(node.person.employeeId);
    if (parent) byId.get(parent)!.children.push(node);
    else roots.push(node);
  }

  const byName = (a: OrgNode, b: OrgNode) =>
    b.children.length - a.children.length || a.person.name.localeCompare(b.person.name);
  let levels = 0;
  const walk = (node: OrgNode, depth: number): number => {
    node.depth = depth;
    levels = Math.max(levels, depth + 1);
    node.children.sort(byName);
    node.total = node.children.reduce((sum, c) => sum + 1 + walk(c, depth + 1), 0);
    return node.total;
  };
  roots.sort((a, b) => b.total - a.total || a.person.name.localeCompare(b.person.name));
  roots.forEach((r) => walk(r, 0));
  roots.sort((a, b) => b.total - a.total || a.person.name.localeCompare(b.person.name));
  return { roots, byId, levels };
}

/** Manager chain from the top down to (not including) the person. */
export function chainOf(forest: OrgForest, id: string): OrgNode[] {
  const chain: OrgNode[] = [];
  const seen = new Set<string>([id]);
  let node = forest.byId.get(id);
  while (node) {
    const parent = findParent(forest, node.person.employeeId);
    if (!parent || seen.has(parent.person.employeeId)) break;
    seen.add(parent.person.employeeId);
    chain.unshift(parent);
    node = parent;
  }
  return chain;
}

export function findParent(forest: OrgForest, id: string): OrgNode | null {
  const m = forest.byId.get(id)?.person.managerId;
  const parent = m ? forest.byId.get(m) : undefined;
  return parent && parent.children.some((c) => c.person.employeeId === id) ? parent : null;
}

/** Ids of everyone below the person (any depth). */
export function descendantIds(node: OrgNode): Set<string> {
  const out = new Set<string>();
  const stack = [...node.children];
  while (stack.length) {
    const n = stack.pop()!;
    out.add(n.person.employeeId);
    stack.push(...n.children);
  }
  return out;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

const PALETTE: { avatar: string; bar: string; chip: ChipVariant }[] = [
  { avatar: 'bg-blue-100 text-blue-700', bar: 'bg-blue-500', chip: 'lightBlue' },
  { avatar: 'bg-emerald-100 text-emerald-700', bar: 'bg-emerald-500', chip: 'green' },
  { avatar: 'bg-violet-100 text-violet-700', bar: 'bg-violet-500', chip: 'purple' },
  { avatar: 'bg-amber-100 text-amber-700', bar: 'bg-amber-500', chip: 'brown' },
  { avatar: 'bg-rose-100 text-rose-700', bar: 'bg-rose-500', chip: 'pink' },
  { avatar: 'bg-cyan-100 text-cyan-700', bar: 'bg-cyan-500', chip: 'darkGreen' },
  { avatar: 'bg-lime-100 text-lime-700', bar: 'bg-lime-500', chip: 'yellow' },
  { avatar: 'bg-fuchsia-100 text-fuchsia-700', bar: 'bg-fuchsia-500', chip: 'darkPink' },
];

export type DeptTone = (typeof PALETTE)[number];

/** Stable colour per department name (avatar / top bar classes + a ui-chip variant). */
export function deptTone(department: string): DeptTone {
  let h = 0;
  for (const ch of department.toLowerCase()) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return department ? PALETTE[h % PALETTE.length] : { avatar: 'bg-gray-100 text-gray-600', bar: 'bg-gray-400', chip: 'lightGrey' };
}

export function matches(p: OrgPerson, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [p.name, p.preferredName, p.employeeId, p.designation, p.department, p.location].some((v) => v.toLowerCase().includes(q));
}
