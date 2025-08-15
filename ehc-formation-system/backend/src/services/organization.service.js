const {
  OrganizationalUnit
} = require('../models');

const createOrganizationalUnit = async (data) => {
  try {
    const organizationalUnit = await OrganizationalUnit.create(data);
    return organizationalUnit;
  } catch (error) {
    throw new Error('Error creating organizational unit: ' + error.message);
  }
};

const getOrganizationalUnits = async (companyId) => {
  try {
    const organizationalUnits = await OrganizationalUnit.findAll({
      where: {
        company_id: companyId
      },
    });
    return organizationalUnits;
  } catch (error) {
    throw new Error('Error fetching organizational units: ' + error.message);
  }
};

const getOrganizationalUnitById = async (id) => {
  try {
    const organizationalUnit = await OrganizationalUnit.findByPk(id);
    if (!organizationalUnit) {
      throw new Error('Organizational unit not found');
    }
    return organizationalUnit;
  } catch (error) {
    throw new Error('Error fetching organizational unit: ' + error.message);
  }
};

const updateOrganizationalUnit = async (id, data) => {
  try {
    const organizationalUnit = await OrganizationalUnit.findByPk(id);
    if (!organizationalUnit) {
      throw new Error('Organizational unit not found');
    }
    await organizationalUnit.update(data);
    return organizationalUnit;
  } catch (error) {
    throw new Error('Error updating organizational unit: ' + error.message);
  }
};

const deleteOrganizationalUnit = async (id) => {
  try {
    const organizationalUnit = await OrganizationalUnit.findByPk(id);
    if (!organizationalUnit) {
      throw new Error('Organizational unit not found');
    }
    await organizationalUnit.destroy();
    return {
      message: 'Organizational unit deleted successfully'
    };
  } catch (error) {
    throw new Error('Error deleting organizational unit: ' + error.message);
  }
};

module.exports = {
  createOrganizationalUnit,
  getOrganizationalUnits,
  getOrganizationalUnitById,
  updateOrganizationalUnit,
  deleteOrganizationalUnit,
};