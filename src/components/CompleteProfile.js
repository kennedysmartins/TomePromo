import React, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import AvatarEditor from "react-avatar-editor";
import { ThemeContext } from '@/contexts/ThemeContext'
import { Input } from '@/components/Input'

const ZoomSlider = ({ zoom, onZoomChange }) => {
  return (
    <input
      type="range"
      min="1"
      max="10"
      step="0.1"
      value={zoom}
      onChange={(e) => onZoomChange(parseFloat(e.target.value))}
    />
  );
};

const CompleteProfile = ({ user }) => {
  const { register, setValue, handleSubmit } = useForm();
  const [editedImage, setEditedImage] = useState(null);
  const [zoom, setZoom] = useState(2);
  const editorRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
  }, [user, setValue]);

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedImage(file);
  };

  const handleImageCrop = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        setEditedImage(blob);
      });
    }
  };

  const handleSave = () => {
    handleImageCrop();
    setEditedImage(null);
  };

  const handleCancel = () => {
    setEditedImage(null);
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    alert("user updated successfully");
  };



  return (
    <form className={`${theme === 'dark' ? ' text-white': ' text-zinc-900 '}`}>
      <div className="mb-4">
        <label htmlFor="name" className={`${theme === 'dark' ? ' text-white': ' text-zinc-900 '}`}>
          Nome:
        </label>
        <Input
          {...register("name")}
          id="name"
          
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className={`${theme === 'dark' ? ' text-white': ' text-zinc-900 '}`}>
          E-mail:
        </label>
        <Input
          {...register("email")}
          id="email"
          
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className={`${theme === 'dark' ? ' text-white': ' text-zinc-900 '}`}>
          Telefone:
        </label>
        <Input
          {...register("phone")}
          id="phone"
          
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className={`${theme === 'dark' ? ' text-white': ' text-zinc-900 '}`}>
          Imagem:
        </label>

        <img src={user.image} className="rounded-full" />

        <Input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          id="image"
          className="py-2 px-3"
        />
      </div>

      {editedImage && (
        <>
          <AvatarEditor
            ref={editorRef}
            image={editedImage}
            width={200}
            height={200}
            border={10}
            color={[255, 255, 255, 0.6]}
            rotate={0}
            scale={zoom}
          />
          <ZoomSlider zoom={zoom} onZoomChange={handleZoomChange}></ZoomSlider>
          <div className="flex gap-3">
            <div className="flex justify">
              <button
                type="submit"
                onClick={handleCancel}
                className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
            <div className="flex justify">
              <button
                type="submit"
                onSubmit={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </>
      )}

      <button
        type="submit"
        onSubmit={handleSubmit(onSubmit)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Atualizar cadastro
      </button>
    </form>
  );
};
export default CompleteProfile;
