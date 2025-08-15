const organizationService = require('../services/organization.service');

const createOrganizationalUnit = async (req, res, next) => {
  try {
    const orgUnitData = req.body;
    const organizationalUnit = await organizationService.createOrganizationalUnit(orgUnitData);
    res.status(201).json(organizationalUnit);
  } catch (error) {
    next(error);
  }
};

const getAllOrganizationalUnits = async (req, res, next) => {
  try {
    const organizationalUnits = await organizationService.getAllOrganizationalUnits();
    res.status(200).json(organizationalUnits);
  } catch (error) {
    next(error);
  }
};

const getOrganizationalUnitById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const organizationalUnit = await organizationService.getOrganizationalUnitById(id);
    if (!organizationalUnit) {
      return res.status(404).json({ message: 'Organizational Unit not found' });
    }
    res.status(200).json(organizationalUnit);
  } catch (error) {
    next(error);
  }
};

const updateOrganizationalUnit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orgUnitData = req.body;
    const updatedOrganizationalUnit = await organizationService.updateOrganizationalUnit(id, orgUnitData);
    res.status(200).json(updatedOrganizationalUnit);
  } catch (error) {
    next(error);
  }
};

const deleteOrganizationalUnit = async (req, res, next) => {
  try {
    const { id } = req.params;
    await organizationService.deleteOrganizationalUnit(id);
    res.status(200).json({ message: 'Organizational Unit deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrganizationalUnit,
  getAllOrganizationalUnits,
  getOrganizationalUnitById,
  updateOrganizationalUnit,
  deleteOrganizationalUnit,
};