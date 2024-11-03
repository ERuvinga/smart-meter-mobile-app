// create class to get and set value
import * as ImagePicker from "expo-image-picker";
import { SetterOrUpdater } from "recoil";

class PickerCalss {
    private SetterSaveImage: SetterOrUpdater<ImagePicker.ImagePickerAsset>;
    private Action: string;
    // initiale Class Attributs
    constructor(
        action: string,
        setterFile: SetterOrUpdater<ImagePicker.ImagePickerAsset>
    ) {
        this.SetterSaveImage = setterFile;
        this.Action = action;
    }

    //privates Methodes
    private getGalerryPermission = () => {
        try {
            ImagePicker.requestMediaLibraryPermissionsAsync().then((datas) =>
                console.log(datas)
            ); // getting a Cameras premissions
        } catch (error) {
            console.log(error);
        }
    };
    private getCameraPermission = () => {
        try {
            ImagePicker.requestCameraPermissionsAsync().then((datas) =>
                console.log(datas)
            ); // getting a Cameras premissions
        } catch (error) {
            console.log(error);
        }
    };
    private openGallery = async () => {
        try {
            //await this.getGalerryPermission();
            // No permissions request is necessary for launching the image library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                this.SetterSaveImage({
                    ...result.assets[0],
                });

                return {
                    result,
                    sucess: true,
                };
            } else {
                return {
                    result: {},
                    success: false,
                };
            }
        } catch (error) {
            console.log(error);
        }
    };

    private openCamera = async () => {
        try {
            //Checking if Permission to access to Gallery are True
            await this.getCameraPermission();
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                this.SetterSaveImage({
                    ...result.assets[0],
                });

                return {
                    result,
                    sucess: true,
                };
            } else {
                return {
                    result: {},
                    success: false,
                };
            }
        } catch (error) {
            console.log(error);
        }
    };

    // publics Methodes
    public LauchImage = async () => {
        switch (this.Action) {
            case "Gallery": {
                this.openGallery(); // Open Gallery
                break;
            }

            case "Camera": {
                this.openCamera(); //Open Camera
                break;
            }
        }
    };
}

const usePickerImage = (
    whereToSearchImage: string,
    setterSavedImage: SetterOrUpdater<ImagePicker.ImagePickerAsset>
) => {
    return new PickerCalss(whereToSearchImage, setterSavedImage);
};

export default usePickerImage;
