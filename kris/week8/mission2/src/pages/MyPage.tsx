import { useEffect, useRef, useState } from "react"
import { getMyInfo } from "../apis/auth"
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Check, Settings, X } from "lucide-react";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard";
import LpCardSkeletonList from "../components/LpCardSkeletonList";
import useGetUserLpList from "../hooks/queries/useGetUserLpList";
import useGetInfiniteUserLpList from "../hooks/queries/useGetInfiniteUserLpList";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePatchMyInfo from "../hooks/mutations/usePatchMyInfo";
import { postUploads } from "../apis/lp";

export const MyPage = () => {
  const navigate = useNavigate();
  const {accessToken} = useAuth();
  const {data} = useGetMyInfo(accessToken);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string>("");

  const {data: userLps, isFetching, hasNextPage, isPending, fetchNextPage, isError} = useGetInfiniteUserLpList(10, search, order);

  useEffect(() => {
    if(data?.data) {
      setNameInput(data?.data.name);
      setBioInput(data?.data.bio || "");
      setAvatar(data?.data.avatar || "");
    }
  }, [data])

  const {mutate: patchMyInfo} = usePatchMyInfo();

  const handleOrderChange = (newOrder: PAGINATION_ORDER) => {
    setOrder(newOrder)
  }

  const handleEditMyInfo = () => {
    setIsEditing(!isEditing);
  }

  const handleSubmitEditMyInfo = () => {
    patchMyInfo({
      name: nameInput || "",
      bio: bioInput || "",
      avatar: avatar || data?.data.avatar || "",
    })
    setIsEditing((prev) => !prev);
  }

  const handleCancelEditMyInfo = () => {
    setIsEditing((prev) => !prev)
    setNameInput(data?.data.name);
    setBioInput(data?.data.bio || "");
  }

  const refHTML = useRef<HTMLInputElement>(null);

  const handleClickAvatar = () => {
    if(!isEditing) return;
    if(refHTML.current) {
      refHTML.current.click();
    }
  }

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const formData = new FormData();
    formData.append("file", file as Blob);
    if(!file) {
      alert("파일을 선택하지 않았습니다.")
      return;
    }
    handleUploadAvatar(formData);
  }

  const handleUploadAvatar = async (formData: FormData) => {
    const {data} = await postUploads(formData);
    if(data.imageUrl) {
      setAvatar(data.imageUrl);
    }
  }

  const {ref, inView} = useInView({
    threshold: 0,
    delay: 300
  })

  useEffect(() => {
    if(inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  const [nameInput, setNameInput] = useState(data?.data.name);
  const [bioInput, setBioInput] = useState(data?.data.bio || "");

  return (
    <>
      <div className="bg-black text-white h-full p-4">
        <div className="flex flex-row justify-center mb-10">
          <div className="flex flex-row mt-10">
            <img className={`rounded-full m-5 w-30 h-30 border-1 ${isEditing && `cursor-pointer`}`} src={avatar || data?.data?.avatar as string} alt="" onClick={handleClickAvatar}/>
            {isEditing && (
                <input type="file" ref={refHTML} accept="image/*" className="hidden" onChange={handleChangeAvatar}/>
            )}
            <div className="flex flex-col justify-center  space-y-2 my-5">
              {!isEditing && (
                <>
                  <h1 className="text-3xl">{data?.data?.name}</h1>
                  <h2>{data?.data?.bio}</h2>
                </>
              )}
              {isEditing && (
                <>
                  <input type="text" className="text-2xl border-1 border-white rounded-md p-1" value={nameInput} onChange={(e) => {setNameInput(e.target.value);}}
                  />
                  <input type="text" className="text-md border-1 border-white rounded-md p-1" value={bioInput} onChange={(e) => {setBioInput(e.target.value);}}/>
                </>
              )}
              <h2>{data?.data?.email}</h2>
            </div>
            <div className="mx-2 my-5">
              {!isEditing && (
                <Settings className="scale-80 cursor-pointer" onClick={handleEditMyInfo}/>
              )}
              {isEditing && (
                <>
                  <Check className="cursor-pointer" onClick={() => handleSubmitEditMyInfo()}/>
                  <X className="cursor-pointer" onClick={() => handleCancelEditMyInfo()}/>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end px-20">
          <button className={`px-4 py-2 rounded-md border border-gray-200 ${order === PAGINATION_ORDER.desc ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => handleOrderChange(PAGINATION_ORDER.desc)}>최신순</button>
          <button className={`px-4 py-2 rounded-md border border-gray-200 ${order === PAGINATION_ORDER.asc ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => handleOrderChange(PAGINATION_ORDER.asc)}>오래된순</button>
        </div>
        <div className="flex flex-wrap">
          {isError && (
            <div className="flex flex-row justify-center items-center bg-black text-white h-full">
              <h1>데이터를 불러올 수 없습니다.</h1>
            </div>
          )}
          {userLps?.pages?.map((page) => page.data.data)?.flat()?.map((lp) => (
            <LpCard key={lp.data?.id} lp={lp} />
          ))}
        </div>
        <div ref={ref}>
          {isFetching && (
            <LpCardSkeletonList count={3}/>
          )}
        </div>
      </div>
    </>
  )
}
