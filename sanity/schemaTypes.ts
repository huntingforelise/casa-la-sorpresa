export const localizedString = {
  name: "localizedString",
  title: "Localized string",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "string" },
    { name: "nl", title: "Dutch", type: "string" },
    { name: "es", title: "Spanish", type: "string" },
  ],
};

export const siteSettings = {
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    { name: "title", type: "localizedString" },
    { name: "description", type: "localizedString" },
    { name: "email", type: "string" },
    { name: "phone", type: "string" },
    { name: "registrationNumber", type: "string" },
  ],
};

export const galleryImage = {
  name: "galleryImage",
  title: "Gallery image",
  type: "document",
  fields: [
    { name: "title", type: "localizedString" },
    { name: "image", type: "image" },
    {
      name: "category",
      type: "string",
      options: { list: ["pool", "inside", "garden", "views", "area"] },
    },
    { name: "order", type: "number" },
  ],
};

export const rateSeason = {
  name: "rateSeason",
  title: "Rate season",
  type: "document",
  fields: [
    { name: "name", type: "localizedString" },
    { name: "months", type: "string" },
    { name: "nightly", type: "number" },
  ],
};

export const amenity = {
  name: "amenity",
  title: "Amenity",
  type: "document",
  fields: [
    { name: "title", type: "localizedString" },
    { name: "text", type: "localizedString" },
    { name: "icon", type: "string" },
    { name: "order", type: "number" },
  ],
};

export const schemaTypes = [
  localizedString,
  siteSettings,
  galleryImage,
  rateSeason,
  amenity,
];
