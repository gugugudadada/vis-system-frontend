import request from "@/utils/request";

export const GetModelMeta = (datasetid) => {
  return request({
    url: "/models",
    method: "get",
    params: {
      datasetid: datasetid,
    },
  });
};

export const GetModelCM = (modelid) => {
  return request({
    url: "/modelcm",
    method: "get",
    params: {
      modelid: modelid,
    },
  });
};

export const GetModelView3 = (modelid, type1, type2, scatterType, batchSize) => {

  console.log("get model view3: ", modelid, type1, type2, scatterType, batchSize);
  return request({
    url: "/modelview3",
    method: "get",
    params: {
      modelid: modelid,
      type1: type1,
      type2: type2,
      scatterType: scatterType,
      batchSize: batchSize,
    },
  });
};

export const GetModelBatch = (modelid, type1, type2, batchid) => {
  return request({
    url: "/modelbatch",
    method: "get",
    params: {
      modelid: modelid,
      type1: type1,
      type2: type2,
      batchid: batchid,
    },
  });
};

export const GetValidationResult = (modelid, sample) => {
  return request({
    url: "/modelvalidationresult",
    method: "get",
    params: {
      modelid: modelid,
      sample: sample,
    },
  });
};
