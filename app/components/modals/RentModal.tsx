'use client';

import Modal from '@/app/components/modals/Modal';
import useRentModal from '@/app/hooks/useRentModal';
import { useMemo, useState } from 'react';
import Heading from '@/app/components/Heading';
import useCategories from '@/app/hooks/useCategories';
import CategoryInput from '@/app/components/inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '@/app/components/inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '@/app/components/inputs/Counter';
import ImageUpload from '@/app/components/inputs/ImageUpload';
import Input from '@/app/components/inputs/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const categories = useCategories();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit: onSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: 'beach',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(
    () => dynamic(() => import('@/app/components/Map'), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleBack = () => setStep((step) => step - 1);

  const handleNext = () => {
    if (STEPS.CATEGORY === step && !category) {
      toast.error('The category is required');
      return;
    }
    if (STEPS.LOCATION === step && !location) {
      toast.error('The location is required');
      return;
    }
    if (STEPS.IMAGES === step && !imageSrc) {
      toast.error('At least one picture is required');
      return;
    }
    setStep((step) => step + 1);
  };

  const handleClose = () => {
    rentModal.onClose();
    reset();
    setStep(STEPS.CATEGORY);
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return handleNext();

    setIsLoading(true);

    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        handleClose();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  };

  const actionLabel = useMemo(() => {
    if (STEPS.PRICE === step) return 'Create';
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (STEPS.CATEGORY === step) return;
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Which of the followings does best describe your place?'
        subtitle='Pick a category'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {categories.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Where is your home located?'
          subtitle='Help guests find you!'
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Share some info your home'
          subtitle='What amenities do you have?'
        />
        <Counter
          onChange={(value) => setCustomValue('guestCount', value)}
          value={guestCount}
          title='Guests'
          subtitle='How many guests do you allow?'
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title='Rooms'
          subtitle='How many rooms do you have?'
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Add a photo of your home'
          subtitle='Show to your guests what your home looks like!'
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='How would you describe your home?'
          subtitle='Short and sweet work best!'
        />
        <Input
          id='title'
          label='Title'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id='description'
          label='Description'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='How much do you charge per night?'
          subtitle='Just set what works best for you'
        />
        <Input
          id='price'
          label='Price'
          formatPrice
          type='number'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title='BnB your home'
      onClose={handleClose}
      onSubmit={onSubmit(handleSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : handleBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
