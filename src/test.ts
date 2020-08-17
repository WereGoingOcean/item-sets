import { ItemBlock, Item, ItemSet, ItemSets } from "./electron/models/league/item-set";
import ItemSetExporter from "./electron/league/item-set-exporter";
import { HardCodedPathProvider } from "./electron/league/league-path-provider";

// Quick script for testing new stuff
const twoHealthPotions = new Item('2003', 2);

const bootsOfSpeed = new Item('1001', 1);

const ludens = new Item('3285', 1);

const startingItemBlock = new ItemBlock('Starting Items', [bootsOfSpeed, twoHealthPotions]);

const coreItemBlock = new ItemBlock('Core', [ludens]);

const itemSet = new ItemSet('TestingSet', [startingItemBlock, coreItemBlock]);

const map = new Map<string, ItemSet[]>();

map.set('Ahri', [itemSet]);

const setExporter = new ItemSetExporter(new HardCodedPathProvider());

setExporter.export_item_sets(new ItemSets(map));