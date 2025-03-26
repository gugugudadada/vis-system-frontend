import request from '@/utils/request';

export const GetDatasetList = () => {
    return request({
        url: '/datasets',
        method: 'get',
    });
}