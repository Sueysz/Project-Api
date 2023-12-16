export const getSortOptions = (sortBy, sortOrder)=>{
    /** @typedef {import('mongoose').SortOrder} SortOrder */
    /** @type {{ [key: string]: SortOrder }} */
    let sortOptions = { name: 'asc' }

    if (sortBy) {
        if (sortOrder === "desc") {
            sortOptions = { [sortBy.toString()]: 'desc' }
        } else {
            sortOptions = { [sortBy.toString()]: 'asc' }
        }
    }

    return sortOptions
};