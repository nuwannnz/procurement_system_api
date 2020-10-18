const express = require("express");
const router = express.Router();
const { verifyJWTToken } = require("./middleware");

const siteService = require("../services/site.service");

router.post("/", verifyJWTToken, async (req, res, next) => {
  // extract data
  const { name, address } = req.body;

  try {
    // create item
    const addedSite = await siteService.createSite(name, address);
    if (addedSite) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to add site" });
  }
});

router.patch("/supplier/:id", verifyJWTToken, async (req, res, next) => {
  // extract data
  const siteId = req.params.id;
  const { supplierId } = req.body;

  try {
    // create item
    const updatedSite = await siteService.addSupplierToSite(siteId, supplierId);
    if (updatedSite) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to add supplier to site" });
  }
});

router.delete("/:id", verifyJWTToken, async (req, res, next) => {
  // extract data
  const siteId = req.params.id;

  try {
    // create item
    const deletedSite = await siteService.deleteSite(siteId);
    if (deletedSite) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to delete site" });
  }
});

router.delete(
  "/:siteId/supplier/:supplierId",
  verifyJWTToken,
  async (req, res, next) => {
    // extract data
    const siteId = req.params.siteId;
    const supplierId = req.params.supplierId;

    try {
      // create item
      const deletedSite = await siteService.removeSupplierToSite(
        siteId,
        supplierId
      );
      if (deletedSite) {
        return res.json({ completed: true });
      }
      return res.json({ completed: false });
    } catch (error) {
      console.error(error);
      res.json({ error: "Failed to remove supplier from site" });
    }
  }
);

router.patch("/:id", verifyJWTToken, async (req, res, next) => {
  // extract data
  const siteId = req.params.id;
  const { name, supplierId: address } = req.body;

  try {
    // create item
    const updatedSite = await siteService.updateSite(siteId, {
      name,
      address,
    });
    if (updatedSite) {
      return res.json({ completed: true });
    }
    return res.json({ completed: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to update site" });
  }
});

router.get("/:id/supplier", verifyJWTToken, async (req, res, next) => {
  // extract id
  const siteId = req.params.id;

  try {
    // create item
    const suppliers = await siteService.getSuppliersOfSite(siteId);
    if (suppliers) {
      return res.json({ suppliers });
    }
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to get sites of supplier" });
  }
});

router.get("/", verifyJWTToken, async (req, res, next) => {
  try {
    // create item
    const sites = await siteService.getAllSites();
    if (sites) {
      return res.json({ sites });
    }
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to get sites" });
  }
});

module.exports = router;
