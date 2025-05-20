"use client";

import { useUpdateProfileMutation } from "@/hooks/mutation/use-update-profile-mutation";
import {
  Alert,
  Button,
  Card,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Tables } from "database.types";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface UserProfileEditModalProps {
  onClose: () => void;
  profile: Tables<"users">;
  onSave: (data: Tables<"users">) => void;
}

export function UserProfileEditModal({ onClose, profile, onSave }: UserProfileEditModalProps) {
  // Replace form state with react-hook-form
  const form = useForm<Tables<"users">>({
    defaultValues: {
      ...profile,
      bio: profile.bio || "",
      location: profile.location || "",
      website: profile.website || "",
      image_url: profile.image_url || "",
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  // Watch bio for derived state
  const bio = watch("bio") || "";
  const bioCharCount = 500 - bio.length;

  // Use the update profile mutation
  const updateProfileMutation = useUpdateProfileMutation({
    onSuccess: (response) => {
      if (response.data) {
        onSave(response.data);
        onClose();
      }
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
    },
  });

  // Handle image upload
  const handleImageUpload = (field: "image_url", imageUrl: string) => {
    setValue(field, imageUrl, { shouldDirty: true });
  };

  // Handle save with react-hook-form's handleSubmit
  const onSubmit = (data: Tables<"users">) => {
    updateProfileMutation.mutate({
      username: data.username,
      display_name: data.display_name,
      bio: data.bio || null,
      location: data.location || null,
      website: data.website || null,
      image_url: data.image_url || null,
    });
  };

  return (
    <Modal onClose={onClose} size='xl' scrollBehavior='inside' defaultOpen backdrop='blur'>
      <ModalContent>
        {(onModalClose) => (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className='flex flex-col gap-1'>Edit Profile</ModalHeader>
              <ModalBody className='overflow-hidden'>
                <div className='space-y-6'>
                  <Alert
                    color='primary'
                    description={
                      <span>
                        To edit avatar and username, go to{" "}
                        <Link
                          href='/account-settings'
                          className='[font-size:inherit] text-inherit underline'
                        >
                          Account Settings
                        </Link>
                      </span>
                    }
                  />
                  <Card isDisabled className='rounded-none space-y-6 shadow-none'>
                    {/* Avatar */}
                    <div className='space-y-2'>
                      <p className='text-small font-medium'>Profile Picture</p>
                      <div className='flex items-center space-x-4'>
                        <div className='w-20 h-20 rounded-full overflow-hidden'>
                          {watch("image_url") ? (
                            <div className='relative w-full h-full'>
                              <Image
                                src={watch("image_url") || ""}
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
                      disabled
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
                          isDisabled
                          classNames={{
                            label: "top-0 pt-[inherit]",
                          }}
                          {...field}
                          value={field.value || ""}
                        />
                      )}
                    />
                  </Card>
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
                        value={field.value || ""}
                      />
                    )}
                  />
                  {/* Location */}
                  <Controller
                    name='location'
                    control={control}
                    render={({ field }) => (
                      <Input
                        label='Location'
                        placeholder='e.g., San Francisco, CA'
                        {...field}
                        value={field.value || ""}
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
                        value={field.value || ""}
                      />
                    )}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='flat' onPress={onModalClose}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  color='primary'
                  isLoading={updateProfileMutation.isPending}
                  isDisabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </ModalFooter>
            </form>
            {/* <UserProfile
              appearance={{
                elements: {
                  rootBox: "max-w-full",
                  cardBox: "max-w-full",
                },
              }}
            /> */}
          </div>
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
