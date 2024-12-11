import { View, Text, Button, Image } from "react-native";
import React, { useEffect, useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import {
  ButtonComponent,
  ButtonImagePicker,
  DropdownPicker,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TimePicker,
} from "../components";
import TextComponent from "../components/TextComponent";
import { useDispatch, useSelector } from "react-redux";
import { authReducer, authSelector } from "../redux/reducers/authReducer";
import ChoiceLocation from "../components/ChoiceLocation";
import userAPI from "../apis/userApi";
import { Drop } from "iconsax-react-native";
import { SelectModel } from "../models/SelectModel";
import { Validate } from "../../utils/validate";
import { eventModel } from "../models/eventModel";
import eventAPI from "../apis/eventApi";
import { addEvent } from "../redux/reducers/eventReducer";

const initValues = {
  title: "",
  description: "",
  locationTitle: '',
  locationAddress: '',
  position: {
    lat: '',
    long: '',
  },
  imageUrl: "",
  users: [],
  hostId: "",
  
  startDate : Date.now(),
  endDate: Date.now(),
  
  status: "đang hoạt động",
};

const AddNewScreen = ({navigation}:any) => {
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  const [eventData, setEventData] = useState<any>({
    ...initValues,
    hostId: auth.id,
  });

  const [userSelects, setUserSelects] = useState<SelectModel[]>([])

  const [errorMess, setErrorMess] = useState<string[]>([])
  

  useEffect(() => {
    handleGetAllUsers()
  }, [])

  useEffect(() => {
    const mess = Validate.EventValidation(eventData)

    setErrorMess(mess)
  },[eventData])

  const uploadImageToCloudinary = async (imageUri: string) => {
    const data = new FormData();
    const file = {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    } as any;
    data.append("file", file);
    data.append("upload_preset", "j4uytbqh"); // 
    data.append("cloud_name", "dprqrzuba"); 

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dprqrzuba/image/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      return result.secure_url; // URL ảnh đã tải lên
    } catch (error) {
      console.error("Upload to Cloudinary failed:", error);
      return null;
    }
  };

  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items = { ...eventData };
    items[`${key}`] = value;
    setEventData(items);
  };
  const handleGetAllUsers = async () => {
    const api = `/get-all`;

    try {
      const res: any = await userAPI.HandleUser(api);
      
      if(res && res.data) {
        const items: SelectModel[]= []

        res.data.forEach((item: any) =>
          item.email &&
          items.push({
            label: item.email,
            value: item.id
          })
        )
        setUserSelects(items)
        
      }
    } catch (error) {
      console.log("errorrrr", error);
    }
  }

  

const handleImageSelected = async (imageData: { type: 'file' | 'url', value: any }) => {
  if (imageData.type === 'file') {
    const cloudinaryUrl = await uploadImageToCloudinary(imageData.value.uri);
    if (cloudinaryUrl) {
      handleChangeValue("imageUrl", cloudinaryUrl);
    }
  } else {
    handleChangeValue("imageUrl", imageData.value);
  }
  
}; 
const handleLocation = (val: any) => {
  const items = { ...eventData };
    items.position = val.position;
    items.locationAddress = val.address;
    setEventData(items);
  }
  const handleAddEvent = async () => {
    const eventPayload = {
        ...eventData,
        startDate : eventData.startDate.getTime(),
        endDate: eventData.endDate.getTime(),
        // date: eventData.date.getTime(),
    };
    handlePushEvent(eventPayload);
    console.log(eventPayload)
};

  const handlePushEvent = async (event: eventModel) => {
    console.log("Sending event data:", event);
    
    const api = '/add-new';
    try {
        const res = await eventAPI.HandleEvent(api, event, 'post');
        console.log("Full Response:", res);
        if (res && res.data) {
            console.log("Response Data:", res.data);
            navigation.navigate('Home');
            // dispatch(addEvent(res.data));
            setEventData({ ...initValues, hostId: auth.id });
        }
    } catch (error) {
        console.log("Error during adding event:", error);
    }
  }

  return (
    <ContainerComponent isScoll>
      <SectionComponent>
        <TextComponent text="Thêm Mới" title />
      </SectionComponent>
      <SectionComponent>
      
        <ButtonImagePicker onSelect={handleImageSelected} />
        <InputComponent
          placeholder="Tên chuyến đi"
          value={eventData.title}
          onChange={(val) => handleChangeValue("title", val)}
        />
        {/* <InputComponent
          placeholder="Mô tả"
          // multiline
          allowClear
          numberOfLines={3}
          value={eventData.descreption}
          onChange={(val) => handleChangeValue("descreption", val)}
        /> */}
        
          <TimePicker
            label="Ngày bắt đầu"
            type="date"
            onSelect={(val) => handleChangeValue("startDate", val)}
            selected={eventData.startDate }
          />
          <SpaceComponent width={20} />
          <TimePicker
            label="ngày kết thúc"
            type="date"
            onSelect={(val) => handleChangeValue("endDate", val)}
            selected={eventData.endDate}
          />
       

        {/* <TimePicker
          label="Ngày Tổ chức"
          type="date"
          onSelect={(val) => handleChangeValue("date", val)}
          selected={eventData.date}
        /> */}

        {/* <DropdownPicker
          label="Thành viên tham gia"
          values={userSelects}
          onSelect={(val: string | string[]) => handleChangeValue("users", val as string[])}
          selected={eventData.users}
          multiple
        /> */}
        {/* <InputComponent
          placeholder="Tiêu đề địa chỉ"
          allowClear
          value={eventData.locationTitle}
          onChange={val => handleChangeValue('locationTitle', val)}
          
        /> */}
        {/* <InputComponent
          placeholder="Số tiền"
          allowClear
          type="number-pad"
          value={eventData.price}
          onChange={val =>
            handleChangeValue("price", val )
          }
        /> */}
        <ChoiceLocation onSelect={val => handleLocation(val)}/>
      </SectionComponent>
      {
        errorMess.length > 0 && (
          <SectionComponent>
            {errorMess.map((mess) => (
              <TextComponent key={mess} text={mess} color="red" />
            ))}
          </SectionComponent>
        )
      }
      <SectionComponent>
        <ButtonComponent disable={errorMess.length > 0} text="add" onPress={handleAddEvent} type="primary" />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;


