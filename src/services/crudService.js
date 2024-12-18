// const ConfigListing = require('../models/configListing');


// ==============================================
// ************ Create a new record *************
// ==============================================
const create = async (model, body) => {
    return await model.create(body);
};


// ===========================================================
// **** Get list of records with pagination and filtering ****
// ===========================================================
const getList = async (model, filter, options, populateArray = []) => {
    const { page = 1, limit = 10, sort = {} } = options;
    const skip = (page - 1) * limit;

    const totalRecords = await model.countDocuments(filter);
    const results = await model.find(filter)
        .populate(populateArray)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    return {
        results,
        meta: {
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            currentPage: page,
            perPage: limit,
        },
    };
};


// =================================================
// ****** Get list with custom configuration *******
// =================================================
const getListWithConfig = async (model, filter, options, type, userId, populateArray = []) => {
    const defaultConfig = {
        limit: options.limit || 10,
        page: options.page || 1,
    };

    const confiListing = await ConfigListing.findOne({
        type,
        $or: [
            { User: userId },
            { User: { $exists: false } },
            { User: null },
        ],
    });

    if (confiListing?.no_of_records) {
        defaultConfig.limit = confiListing.no_of_records;
    }

    const result = await getList(model, filter, { ...defaultConfig, ...options }, populateArray);
    result.config = confiListing || {};

    return result;
};



// =============================================
// *********** Get record by ID ****************
// =============================================
const getById = async (model, id, select = {}, populateArray = []) => {
    const record = await model.findById(id).select(select).populate(populateArray);
    if (!record) throw new NotFoundError('Record not found');
    return record;
};


// ==============================================
// ************ Update record by ID *************
// ==============================================
const updateById = async (model, id, updateBody) => {
    const record = await getById(model, id);
    Object.assign(record, updateBody);
    await record.save();
    return record;
};


// ==============================================
// ***** Delete record by ID (soft delete) ******
// ==============================================
const deleteById = async (model, id) => {
    const record = await getById(model, id);
    record.is_deleted = true;
    await record.save();
    return record;
};


module.exports = {
    create,
    getList,
    getById,
    updateById,
    deleteById,
    getListWithConfig,
};
