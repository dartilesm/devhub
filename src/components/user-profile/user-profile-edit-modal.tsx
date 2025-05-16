"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Image,
  Form,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useForm, Controller } from "react-hook-form";
import { Tables } from "database.types";

// Available technologies for selection
const availableTechnologies = [
  "React",
  "Angular",
  "Vue",
  "Svelte",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Ruby",
  "Java",
  "Go",
  "PHP",
  "C#",
  "Tailwind CSS",
  "SCSS",
  "GraphQL",
  "REST API",
  "Docker",
  "AWS",
  "Firebase",
];

interface UserProfileEditModalProps {
  onClose: () => void;
  profile: Tables<"users">;
  onSave: (data: Tables<"users">) => void;
}

export function UserProfileEditModal({ onClose, profile, onSave }: UserProfileEditModalProps) {
  // Replace form state with react-hook-form
  const form = useForm<Tables<"users">>({
    defaultValues: profile,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
    reset,
  } = form;

  // Loading state
  const [isSaving, setIsSaving] = React.useState(false);

  // Watch technologies and bio for derived state
  /* const technologies = watch("technologies"); */
  const bio = watch("bio");
  const bioCharCount = bio ? 500 - bio.length : 500;

  // Handle technology selection
  /*   const handleTechnologySelect = (tech: string) => {
    const currentTechs = watch("technologies");

    // If already selected, remove it
    if (currentTechs.includes(tech)) {
      setValue(
        "technologies",
        currentTechs.filter((t) => t !== tech)
      );
      return;
    }

    // If already have 3 selections and adding a new one
    if (currentTechs.length >= 3) {
      setValue("technologies", [...currentTechs.slice(1), tech]);
      return;
    }

    // Add new technology
    setValue("technologies", [...currentTechs, tech]);
  }; */

  // Handle image upload
  const handleImageUpload = (field: "image_url", imageUrl: string) => {
    setValue(field, imageUrl, { shouldDirty: true });
  };

  // Handle save with react-hook-form's handleSubmit
  const onSubmit = (data: Tables<"users">) => {
    setIsSaving(true);
    onSave(data);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <Modal onClose={onClose} size='2xl' scrollBehavior='inside' defaultOpen backdrop='blur'>
      <ModalContent>
        {(onModalClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className='flex flex-col gap-1'>Edit Profile</ModalHeader>
            <ModalBody>
              <div className='space-y-6'>
                {/* Cover Image */}
                {/* <div className='space-y-2'>
                  <p className='text-small font-medium'>Cover Image</p>
                  <div className='relative h-40 rounded-large overflow-hidden'>
                    {watch("cover_image") ? (
                      <div className='relative h-full'>
                        <Image
                          src={watch("cover_image")}
                          alt='Cover'
                          className='w-full h-full object-cover'
                          removeWrapper
                        />
                        <Button
                          isIconOnly
                          size='sm'
                          color='danger'
                          variant='flat'
                          className='absolute top-2 right-2'
                          onPress={() => handleImageUpload("cover_image", "")}
                        >
                          <Icon icon='lucide:x' width={18} />
                        </Button>
                      </div>
                    ) : (
                      <ImageUploader
                        onImageUpload={(url) => handleImageUpload("cover_image", url)}
                        aspectRatio='21:9'
                        className='h-full bg-default-100 flex items-center justify-center'
                      >
                        <div className='flex flex-col items-center justify-center text-default-500'>
                          <Icon icon='lucide:image' width={24} />
                          <span className='text-small mt-2'>Upload Cover Image</span>
                        </div>
                      </ImageUploader>
                    )}
                  </div>
                </div> */}
                {/* Avatar */}
                <div className='space-y-2'>
                  <p className='text-small font-medium'>Profile Picture</p>
                  <div className='flex items-center space-x-4'>
                    <div className='w-20 h-20 rounded-full overflow-hidden'>
                      {watch("image_url") ? (
                        <div className='relative w-full h-full'>
                          <Image
                            src={watch("image_url")}
                            alt='Avatar'
                            className='w-full h-full object-cover'
                            removeWrapper
                          />
                          <Button
                            isIconOnly
                            size='sm'
                            color='danger'
                            variant='flat'
                            className='absolute top-0 right-0'
                            onPress={() => handleImageUpload("image_url", "")}
                          >
                            <Icon icon='lucide:x' width={16} />
                          </Button>
                        </div>
                      ) : (
                        <ImageUploader
                          onImageUpload={(url) => handleImageUpload("image_url", url)}
                          aspectRatio='1:1'
                          className='w-full h-full bg-default-100 flex items-center justify-center'
                        >
                          <div className='flex flex-col items-center justify-center text-default-500'>
                            <Icon icon='lucide:user' width={16} />
                          </div>
                        </ImageUploader>
                      )}
                    </div>
                    <div className='flex-1'>
                      <p className='text-tiny text-default-500'>
                        Upload a profile picture to make your profile more personalized.
                      </p>
                      <p className='text-tiny text-default-500 mt-1'>
                        Recommended size: 400x400 pixels.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Display Name */}
                <Controller
                  name='display_name'
                  control={control}
                  rules={{
                    required: "Display name is required",
                    maxLength: {
                      value: 50,
                      message: "Display name cannot exceed 50 characters",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label='Display Name'
                      placeholder='Enter your name'
                      isRequired
                      isInvalid={!!errors.display_name}
                      errorMessage={errors.display_name?.message}
                      description='This is how your name will appear across the platform'
                      classNames={{
                        label: "top-0 pt-[inherit]",
                      }}
                      {...field}
                    />
                  )}
                />
                {/* Bio */}
                <Controller
                  name='bio'
                  control={control}
                  rules={{
                    maxLength: {
                      value: 500,
                      message: "Bio cannot exceed 500 characters",
                    },
                  }}
                  render={({ field }) => (
                    <Textarea
                      label='Biography'
                      placeholder='Tell us about yourself...'
                      maxRows={5}
                      isInvalid={!!errors.bio}
                      errorMessage={errors.bio?.message}
                      description={`${bioCharCount} characters remaining`}
                      {...field}
                    />
                  )}
                />
                {/* Technologies */}
                {/* <div className='space-y-2'>
                  <p className='text-small font-medium'>Your Top Technologies</p>
                  <p className='text-tiny text-default-500'>Select up to 3 technologies</p>

                  <div className='flex flex-wrap gap-2 mt-2'>
                    {technologies.map((tech) => (
                      <div
                        key={tech}
                        className='flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-medium text-tiny'
                      >
                        {tech}
                        <button
                          onClick={() => handleTechnologySelect(tech)}
                          className='ml-1 text-primary-700 hover:text-primary-800'
                          aria-label={`Remove ${tech}`}
                        >
                          <Icon icon='lucide:x' width={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant='flat'
                        color='default'
                        className='mt-2'
                        disabled={technologies.length >= 3}
                      >
                        {technologies.length >= 3 ? "Max technologies selected" : "Add Technology"}
                        <Icon icon='lucide:chevron-down' className='ml-2' width={16} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label='Technology selection'
                      selectionMode='multiple'
                      selectedKeys={new Set(technologies)}
                      onSelectionChange={(selection) => {
                        // This is just for visual selection, actual management is handled by handleTechnologySelect
                      }}
                      disallowEmptySelection
                    >
                      {availableTechnologies.map((tech) => (
                        <DropdownItem key={tech} onPress={() => handleTechnologySelect(tech)}>
                          {tech}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div> */}
                {/* Location */}
                <Controller
                  name='location'
                  control={control}
                  render={({ field }) => (
                    <Input
                      label='Location'
                      placeholder='e.g., San Francisco, CA'
                      {...field}
                      classNames={{
                        label: "top-0 pt-[inherit]",
                      }}
                    />
                  )}
                />
                {/* Website */}
                <Controller
                  name='website'
                  control={control}
                  rules={{
                    pattern: {
                      value:
                        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
                      message: "Please enter a valid URL",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label='Website'
                      placeholder='https://yourwebsite.com'
                      isInvalid={!!errors.website}
                      errorMessage={errors.website?.message}
                      startContent={
                        <Icon icon='lucide:globe' className='text-default-400' width={16} />
                      }
                      classNames={{
                        label: "top-0 pt-[inherit]",
                      }}
                      {...field}
                    />
                  )}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='default' variant='flat' onPress={onModalClose} disabled={isSaving}>
                Cancel
              </Button>
              <Button color='primary' onPress={handleSubmit(onSubmit)} isLoading={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  aspectRatio?: string;
  children?: React.ReactNode;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  aspectRatio = "1:1",
  children,
  className,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // In a real application, you would upload to your storage service
  // For this demo, we'll simulate uploading by generating a URL from the HeroUI image service
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      // Here we would normally upload the file to a server
      // For demo purposes, we'll generate a random avatar URL
      const imageCategory = aspectRatio === "1:1" ? "avatar" : "landscape";
      const randomId = Math.floor(Math.random() * 100);
      const width = aspectRatio === "1:1" ? 400 : 1200;
      const height = aspectRatio === "1:1" ? 400 : 400;

      const imageUrl = `https://img.heroui.chat/image/${imageCategory}?w=${width}&h=${height}&u=${randomId}`;
      onImageUpload(imageUrl);

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`cursor-pointer ${className || ""}`} onClick={triggerFileInput}>
      {children}
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        accept='image/*'
        className='hidden'
        aria-label='Upload image'
      />
    </div>
  );
};
