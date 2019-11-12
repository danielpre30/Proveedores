import { ObjectID } from "mongodb";

export const getBusinessName = async (db, id) => {
  const business = await db
    .collection("business")
    .findOne({ _id: { $eq: ObjectID(id) } });

  return business ? business.name : "No name";
};

export const getServices = async (db, id) => {
  let servicesAsProvider = await db
    .collection("services")
    .find({ providerId: id })
    .toArray();

  let servicesAsContractor = await db
    .collection("services")
    .find({ contractorId: id })
    .toArray();

  const contractorNames = await Promise.all(
    servicesAsProvider.map(service => getBusinessName(db, service.contractorId))
  );

  const providerNames = await Promise.all(
    servicesAsContractor.map(service => getBusinessName(db, service.providerId))
  );

  return {
    servicesAsProvider: servicesAsProvider.map((service, index) => ({
      ...service,
      name: contractorNames[index]
    })),
    servicesAsContractor: servicesAsContractor.map((service, index) => ({
      ...service,
      name: providerNames[index]
    }))
  };
};

export const getComments = async (db, id) => {
  const comments = await db
    .collection("Comments")
    .find({ target: id })
    .toArray();

  const businessName = await Promise.all(
    comments.map(comments => getBusinessName(db, comments.business))
  );

  return comments.map((comment, index) => ({
    ...comment,
    general: Math.floor(
      (comment.puntuality +
        comment.communication +
        comment.afterSalesService +
        comment.priceQuality) /
        4
    ),
    name: businessName[index]
  }));
};

export const getScore = comments => {
  const puntuality = Math.floor(
    comments.reduce((acc, { puntuality }) => acc + puntuality, 0) /
      comments.length
  );
  const communication = Math.floor(
    comments.reduce((acc, { communication }) => acc + communication, 0) /
      comments.length
  );
  const afterSalesService = Math.floor(
    comments.reduce(
      (acc, { afterSalesService }) => acc + afterSalesService,
      0
    ) / comments.length
  );
  const priceQuality = Math.floor(
    comments.reduce((acc, { priceQuality }) => acc + priceQuality, 0) /
      comments.length
  );

  const general = Math.floor(
    (puntuality + communication + afterSalesService + priceQuality) / 4
  );
  return {
    general,
    puntuality,
    communication,
    afterSalesService,
    priceQuality
  };
};

export default { getBusinessName, getComments };
