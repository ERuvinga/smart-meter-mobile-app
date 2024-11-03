import { useQuery, useMutation } from "react-query";
import axios from "axios";

//constants and type of data to receive
interface dataMutationFetch {
    ApiLink: string;
    EndPoint: string;
    methode: string;
    dataToSending: object;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleError: (errorDatas: any) => void;
    handleSuccess: (errorDatas: object) => void;
}

const headers = {
    //header of methode
    Accept: "application/json",
    "Content-type": "application/json; charset=UTF-8",
};

const headersUploadFile = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
};

export const useMutate = () =>
    useMutation(
        (datas: dataMutationFetch) =>
            axios({
                // fetching datas
                method: `${datas.methode}`,
                baseURL: `${datas.ApiLink}`,
                url: `${datas.EndPoint}`,
                headers,
                data: datas.dataToSending,
            }),
        {
            onError(error, RequestDatas) {
                RequestDatas.handleError(error); // Error manage
            },
            onSuccess(data, RequestDatas) {
                RequestDatas.handleSuccess(data.data); //Sucess manager
            },
        }
    );

//Mutate with Token
interface dataMutationWithToken {
    ApiLink: string;
    EndPoint: string;
    methode: string;
    dataToSending: object;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleError: (errorDatas: any) => void;
    handleSuccess: (errorDatas: object) => void;
    Authorization: string | null;
}
export const useMutateWithToken = () =>
    useMutation(
        (datas: dataMutationWithToken) =>
            axios({
                // fetching datas
                method: `${datas.methode}`,
                baseURL: `${datas.ApiLink}`,
                url: `${datas.EndPoint}`,
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${datas.Authorization}`,
                },
                data: datas.dataToSending,
            }),
        {
            onError(error, RequestDatas) {
                RequestDatas.handleError(error); // Error manage
            },
            onSuccess(data, RequestDatas) {
                RequestDatas.handleSuccess(data.data); //Sucess manager
            },
        }
    );

export const useMutateUploadFile = () =>
    useMutation(
        (datas: dataMutationFetch) =>
            axios({
                // fetching datas
                method: `${datas.methode}`,
                baseURL: `${datas.ApiLink}`,
                url: `${datas.EndPoint}`,
                headers: headersUploadFile,
                data: datas.dataToSending,
            }),
        {
            onError(error, RequestDatas) {
                RequestDatas.handleError(error); // Error manage
                console.log(error);
            },
            onSuccess(data, RequestDatas) {
                RequestDatas.handleSuccess(data.data); //Sucess manager
            },
        }
    );

// Query interface
interface DataOfQueryFetching {
    key: string;
    link: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hangleError: (Error: any) => void;
    handleSucces: (sucessDatas: object) => void;
}

export const useCustomQuery = (datas: DataOfQueryFetching) =>
    useQuery(datas.key, () => axios.get(datas.link), {
        enabled: false,
        onError(error) {
            datas.hangleError(error);
        },
        onSuccess(data) {
            datas.handleSucces(data.data);
        },
    });

interface DataQueryFetchingWithAuthorizationfield {
    key: string;
    link: string;
    Authorization: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hangleError: (Error: any) => void;
    handleSucces: (sucessDatas: object) => void;
}

export const useCustomQueryWithToken = (
    datas: DataQueryFetchingWithAuthorizationfield
) =>
    useQuery(
        datas.key,
        () =>
            axios.get(datas.link, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${datas.Authorization}`,
                },
            }),
        {
            enabled: false,
            onError(error) {
                console.log(error);
                datas.hangleError(error);
            },
            onSuccess(data) {
                datas.handleSucces(data.data);
            },
        }
    );

//Test Fetch
//     fetch(`${Api.LINK}${Api.CREATE_PRODUCT}`, {
//         method: 'post',
//         headers: {
//             Accept: 'application/json',
//             'Content-type': 'application/json; charset=UTF-8',
//             'Authorization': `Bearer ${MyToken}`,
//         },
//         body: JSON.stringify(DatasofNewProduct),
//     })
//         .then((result) =>
//             result.json().then((datas) => console.log(datas))
//         )
//         .catch((error) => console.log(error));

// fetch(`${Api.LINK}${Api.PUT_USER}${OwnerUser.userId}`, {
//     method: 'PUT',
//     headers: {
//         Accept: 'application/json',
//         'Content-type': 'application/json; charset=UTF-8',
//         'Authorization': `Bearer ${MyToken}`,
//     },
//     body: JSON.stringify(NewDatasOfUser),
// })
//     .then((result) => result.json().then((datas) => console.log(datas)))
//     .catch((error) => console.log(error));

// fetch(`${Api.LINK}${Api.CHATS}`, {
//     method: 'post',
//     headers: {
//         Accept: 'application/json',
//         'Content-type': 'application/json; charset=UTF-8',
//         'Authorization': `Bearer ${myToken}`,
//     },
//     body: JSON.stringify(DatasOfNewChat),
// })
//     .then((result) => result.json().then((datas) => console.log(datas)))
//     .catch((error) => console.log(error));
// };

// const uploadImage = () => {
//     const ImageForm = new FormData();
//     ImageForm.append('file', {
//         name: StorePicture.fileName,
//         uri: StorePicture.uri,
//         type: mime.getType(StorePicture.uri),
//     } as any);

//     //Test Fetch
//     fetch(`${Api.LINK}${Api.UPLOADFILE}`, {
//         method: 'post',
//         body: ImageForm,
//     })
//         .then((result) =>
//             result.json().then((datas) => console.log(datas))
//         )
//         .catch((error) => console.log(error));

// };
