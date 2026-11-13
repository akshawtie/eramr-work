export const PRODUCT_PAGE_CONTENT = {
  trays: {
    description: 'A tray design from the kitchenware collection, for serving and tabletop presentation.',
    features: ['Serving and tabletop use', 'Individual design identified by its catalogue code'],
    applications: [
      { title: 'Kitchen', reason: 'Useful for carrying or arranging kitchen and serving items.', icon: 'kitchen' },
      { title: 'Dining room', reason: 'A natural fit for serving and setting out items at the table.', icon: 'dining' },
      { title: 'Living room', reason: 'Can be used to arrange items on a coffee or side table.', icon: 'living' }
    ],
    complementarySubCategories: ['water-pitchers', 'salt-pepper-shakers'],
    complementaryReason: 'These kitchenware designs share serving and tabletop use.'
  },
  'measuring-cups-spoons': {
    description: 'Measuring cups and spoons from the kitchenware range for measuring ingredients during food preparation.',
    features: ['Ingredient measuring', 'Kitchen food-preparation use'],
    applications: [
      { title: 'Kitchen', reason: 'For measuring ingredients while preparing food and recipes.', icon: 'kitchen' }
    ],
    complementarySubCategories: ['canisters'],
    complementaryReason: 'Kitchen storage can support ingredient preparation and organization.'
  },
  'water-pitchers': {
    description: 'A water pitcher from the kitchenware collection, intended for serving and pouring drinks.',
    features: ['Drink serving and pouring', 'Kitchenware collection design'],
    applications: [
      { title: 'Kitchen', reason: 'For keeping a pitcher available during food and drink preparation.', icon: 'kitchen' },
      { title: 'Dining room', reason: 'Suitable for serving drinks at a dining table.', icon: 'dining' }
    ],
    complementarySubCategories: ['trays', 'metal-straws'],
    complementaryReason: 'Trays and drinking straws are related to drink service.'
  },
  canisters: {
    description: 'A canister from the kitchenware collection for kitchen storage. The catalogue does not specify its capacity or intended contents.',
    features: ['Kitchen storage category', 'Capacity and contents are not specified in the catalogue'],
    applications: [
      { title: 'Kitchen', reason: 'Designed for use as part of kitchen storage and organization.', icon: 'kitchen' },
      { title: 'Pantry', reason: 'Can be considered for pantry organization; confirm dimensions and suitability before use.', icon: 'pantry' }
    ],
    complementarySubCategories: ['measuring-cups-spoons'],
    complementaryReason: 'Measuring tools are used alongside kitchen ingredient storage.'
  },
  'salt-pepper-shakers': {
    description: 'A salt and pepper shaker or related tabletop design from the kitchenware collection. Individual item details are reflected in the product name and image.',
    features: ['Tabletop seasoning category', 'Design details vary by catalogue item'],
    applications: [
      { title: 'Kitchen', reason: 'For keeping seasoning items available in a kitchen.', icon: 'kitchen' },
      { title: 'Dining room', reason: 'Suitable for placing seasoning on a dining table.', icon: 'dining' }
    ],
    complementarySubCategories: ['trays'],
    complementaryReason: 'Trays are used for serving and tabletop presentation.'
  },
  'metal-straws': {
    description: 'A straight or bent metal straw from the kitchenware collection, as identified by its product name.',
    features: ['Straight or bent design as listed', 'Metal material is stated in the catalogue name'],
    applications: [
      { title: 'Kitchen', reason: 'For use with drinks prepared or served at home.', icon: 'kitchen' },
      { title: 'Dining room', reason: 'Suitable for serving drinks at a dining table.', icon: 'dining' }
    ],
    complementarySubCategories: ['water-pitchers'],
    complementaryReason: 'Water pitchers and drinking straws both relate to drink service.'
  },
  'utensil-holders': {
    description: 'A utensil holder design from the kitchenware collection for keeping kitchen utensils together.',
    features: ['Kitchen utensil storage', 'Material details are included only where listed in the product name'],
    applications: [
      { title: 'Kitchen', reason: 'For organizing utensils in a kitchen workspace.', icon: 'kitchen' }
    ],
    complementarySubCategories: [],
    complementaryReason: ''
  },
  'accent-tables': {
    description: 'An accent table from the home décor collection. Materials and design details are included in the catalogue name where available.',
    features: ['Occasional furniture for placing or displaying items', 'Construction materials are shown when specified in the product name'],
    applications: [
      { title: 'Living room', reason: 'Suitable as an occasional surface or display point in a living area.', icon: 'living' },
      { title: 'Bedroom', reason: 'Can serve as an accent surface beside other bedroom furniture.', icon: 'bedroom' },
      { title: 'Entryway', reason: 'A compact display surface for an entrance or hallway.', icon: 'entry' }
    ],
    complementarySubCategories: ['flower-vases'],
    complementaryReason: 'Flower vases can be displayed on an accent table; confirm the table dimensions and load capacity before placing items.'
  },
  'flower-vases': {
    description: 'A flower vase or decorative vase from the home décor collection, as identified by its catalogue name.',
    features: ['Vase category for floral or decorative display', 'Material details are included only where specified in the product name'],
    applications: [
      { title: 'Living room', reason: 'Suitable for displaying flowers or as a decorative accent.', icon: 'living' },
      { title: 'Dining room', reason: 'Can be used as a tabletop floral or decorative display.', icon: 'dining' },
      { title: 'Office', reason: 'A decorative accent for a desk or shared space.', icon: 'office' }
    ],
    complementarySubCategories: ['accent-tables'],
    complementaryReason: 'An accent table provides a place to display a vase.'
  },
  'wall-clocks': {
    description: 'A clock or wall-clock design in the home décor collection. The catalogue does not list movement, power, or mounting specifications.',
    features: ['Timepiece category', 'Movement, power, and mounting details are not listed'],
    applications: [
      { title: 'Living room', reason: 'Suitable as a timepiece and wall accent in a living area.', icon: 'living' },
      { title: 'Bedroom', reason: 'A wall clock can provide a visible time display in a bedroom.', icon: 'bedroom' },
      { title: 'Office', reason: 'A wall clock can provide a visible time display in a work area.', icon: 'office' }
    ],
    complementarySubCategories: ['wall-art'],
    complementaryReason: 'Wall art and clocks can be considered together when styling a wall.'
  },
  'wall-art': {
    description: 'A decorative wall-art piece from the home décor collection, with its design described by the catalogue name where available.',
    features: ['Wall décor category', 'Mounting hardware and installation details are not listed'],
    applications: [
      { title: 'Living room', reason: 'Suitable as a decorative feature on a living-area wall.', icon: 'living' },
      { title: 'Bedroom', reason: 'Can add a decorative accent to a bedroom wall.', icon: 'bedroom' },
      { title: 'Office', reason: 'Suitable for adding wall décor to an office or work area.', icon: 'office' }
    ],
    complementarySubCategories: ['wall-clocks', 'mirrors'],
    complementaryReason: 'Clocks and mirrors are related wall décor pieces; confirm placement and mounting requirements independently.'
  },
  'baskets-buckets': {
    description: 'A basket or bucket design in the Cane & Metal collection. The product name identifies the listed material and form where those details are available.',
    features: ['Basket or bucket form as listed', 'Material details are included only where specified in the product name'],
    applications: [
      { title: 'Living room', reason: 'A basket can be used as a decorative or general-purpose household container.', icon: 'living' },
      { title: 'Entryway', reason: 'Suitable for general household organization near an entrance.', icon: 'entry' }
    ],
    complementarySubCategories: [],
    complementaryReason: ''
  },
  'lanterns-hurricanes': {
    description: 'A lantern or hurricane design from the Cane & Metal collection. Candle type, dimensions, and indoor/outdoor rating are not listed.',
    features: ['Lantern or hurricane form as named', 'Candle fit and indoor/outdoor suitability are not specified'],
    applications: [
      { title: 'Living room', reason: 'A decorative lantern can be used as an accent; verify candle and placement safety before use.', icon: 'living' },
      { title: 'Entryway', reason: 'Can be considered as a decorative entry accent; check product suitability and fire-safety guidance before use.', icon: 'entry' }
    ],
    complementarySubCategories: ['candle-holders-votives'],
    complementaryReason: 'Candle holders are related decorative lighting products, but no candle fit or technical compatibility is confirmed.'
  },
  'candle-holders-votives': {
    description: 'A candle holder or votive from the Cane & Metal collection. The catalogue does not specify candle size or heat-resistance details.',
    features: ['Candle-holder or votive category', 'Candle dimensions and safety details are not listed'],
    applications: [
      { title: 'Living room', reason: 'Suitable as a decorative candle accessory when used with an appropriate candle and safe placement.', icon: 'living' },
      { title: 'Dining room', reason: 'Can be considered as a table accent; follow candle safety guidance and keep clear of flammable materials.', icon: 'dining' }
    ],
    complementarySubCategories: ['lanterns-hurricanes'],
    complementaryReason: 'Lanterns and candle holders share a decorative candle-related use, but no candle fit or technical compatibility is confirmed.'
  },
  'pendant-lights': {
    description: 'A pendant light design from the Cane & Metal collection. Electrical, bulb, mounting, and installation specifications are not included in the catalogue.',
    features: ['Pendant-light category', 'Electrical rating, bulb type, and installation details are not listed'],
    applications: [
      { title: 'Living room', reason: 'A pendant light may suit a living space only after its electrical and installation requirements are confirmed.', icon: 'living' },
      { title: 'Dining room', reason: 'A pendant light may suit a dining space only after its electrical and installation requirements are confirmed.', icon: 'dining' }
    ],
    complementarySubCategories: [],
    complementaryReason: ''
  },
  mirrors: {
    description: 'A mirror from the Cane & Metal collection. Dimensions, mounting hardware, and installation requirements are not listed.',
    features: ['Mirror category', 'Dimensions and mounting requirements are not specified'],
    applications: [
      { title: 'Entryway', reason: 'A mirror is commonly useful near an entrance; confirm dimensions and mounting needs.', icon: 'entry' },
      { title: 'Bedroom', reason: 'Suitable as a reflective or decorative feature where its size and mounting can be accommodated.', icon: 'bedroom' },
      { title: 'Living room', reason: 'Can be used as a decorative reflective feature; confirm dimensions and mounting needs.', icon: 'living' }
    ],
    complementarySubCategories: ['wall-art'],
    complementaryReason: 'Wall art is a related décor category; plan placement and mounting separately.'
  },
  'planter-stands': {
    description: 'An iron planter stand from the Cane & Metal collection, as identified by its catalogue name. Pot dimensions and load capacity are not listed.',
    features: ['Iron material is stated in the catalogue name', 'Pot fit and load capacity are not specified'],
    applications: [
      { title: 'Living room', reason: 'For displaying a potted plant where the stand and pot fit the available space.', icon: 'living' },
      { title: 'Entryway', reason: 'Can provide a plant display point near an entrance; confirm dimensions and stability for the intended pot.', icon: 'entry' }
    ],
    complementarySubCategories: [],
    complementaryReason: ''
  },
  stools: {
    description: 'A square or round iron stool from the Cane & Metal collection, as identified by the product name. Dimensions and load rating are not listed.',
    features: ['Iron material and form are stated in the product name', 'Dimensions and load capacity are not specified'],
    applications: [
      { title: 'Living room', reason: 'A stool may provide occasional seating or a surface; confirm load capacity and intended use before use.', icon: 'living' },
      { title: 'Bedroom', reason: 'Can be considered as an occasional seat or accent; confirm load capacity and intended use.', icon: 'bedroom' }
    ],
    complementarySubCategories: [],
    complementaryReason: ''
  },
  'wine-racks': {
    description: 'A wine rack from the Cane & Metal collection. Bottle capacity, dimensions, and mounting or stability requirements are not listed.',
    features: ['Wine storage category', 'Bottle capacity and installation details are not specified'],
    applications: [
      { title: 'Kitchen', reason: 'A wine rack can be considered for bottle storage where its dimensions and stability are suitable.', icon: 'kitchen' },
      { title: 'Dining room', reason: 'Suitable for bottle storage near a dining area if the product dimensions and stability meet the intended use.', icon: 'dining' }
    ],
    complementarySubCategories: ['trays'],
    complementaryReason: 'Trays are related to serving and entertaining, though the products are not technically dependent.'
  }
};

export const PRODUCT_RELATIONSHIPS = {
  compatibleProductIds: {},
  complementarySubCategoriesByProductId: {}
};

export function getListedMaterials(productName) {
  const materialNames = ['Aluminium', 'Aluminum', 'Steel', 'Iron', 'Copper', 'Marble', 'Glass', 'Wood', 'Wooden', 'Rattan', 'Seagrass', 'Jute'];
  return materialNames.filter((material) => new RegExp(`\\b${material}\\b`, 'i').test(productName));
}
