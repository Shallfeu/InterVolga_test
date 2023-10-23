import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Heading,
    Input,
    VStack,
} from '@chakra-ui/react';
import InputMask from 'react-input-mask';
import { Field, FieldProps, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import styles from './AutoForm.module.css';

import 'react-datepicker/dist/react-datepicker.css';

interface FormData {
    auto_number: string;
    auto_type: string;
    date: Date;
    fullname: string;
    pass_series: string;
    pass_number: string;
    who_gived: string;
    when_gived: string;
}

const initialValues: FormData = {
    auto_number: '',
    auto_type: '',
    date: new Date(),
    fullname: '',
    pass_series: '',
    pass_number: '',
    who_gived: '',
    when_gived: '',
};

const FORM_DATA = 'form_data';

const AutoForm = () => {
    const [formData, setFormData] = useState<FormData>(initialValues);

    useEffect(() => {
        const data = localStorage.getItem(FORM_DATA);

        if (data) {
            setFormData(JSON.parse(data));
        }
    }, []);

    const validationSchema = Yup.object().shape({
        auto_number: Yup.string()
            .required('Обязательно к заполнению')
            .matches(/^[0-9]+$/, 'Должно быть число'),
        auto_type: Yup.string().required('Обязательно к заполнению'),
        date: Yup.string().required('Обязательно к заполнению'),
        fullname: Yup.string().required('Обязательно к заполнению'),
        pass_series: Yup.string()
            .required('Обязательно к заполнению')
            .test('len', 'Должно быть ровно 4 цифры', (val) => val.length === 4),
        pass_number: Yup.string()
            .required('Обязательно к заполнению')
            .test('len', 'Должно быть ровно 6 цифры', (val) => val.length === 6),
        who_gived: Yup.string().required('Обязательно к заполнению'),
        when_gived: Yup.string()
            .required('Обязательно к заполнению')
            .matches(/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/, 'Дата должна быть в формате ДД-ММ-ГГГГ'),
    });

    const onHandleSubmit = (values: FormData) => {
        alert(JSON.stringify(values, null, 2));
    };

    const handleSaveLS = (onChange: React.ChangeEventHandler<HTMLInputElement>, value: Record<string, string>) => {
        if (Object.values(value)[0]) {
            const data = localStorage.getItem(FORM_DATA);
            if (data) {
                const parsedData = JSON.parse(data);
                localStorage.setItem(FORM_DATA, JSON.stringify({ ...parsedData, ...value }));
            } else {
                localStorage.setItem(FORM_DATA, JSON.stringify(value));
            }
        }

        return onChange;
    };

    const onResetForm = () => {
        setFormData(initialValues);
        localStorage.setItem(FORM_DATA, '');
    };

    return (
        <Formik
            enableReinitialize
            initialValues={formData}
            onSubmit={onHandleSubmit}
            validationSchema={validationSchema}
        >
            {({ errors, touched, setFieldValue }) => (
                <Form>
                    <Box bg="white" p={6} border="2px" borderColor="blackAlpha.700">
                        <Heading fontSize="3xl" mb="30px">
                            Транспортные средства и водители
                        </Heading>

                        <VStack spacing={4} align="flex-start">
                            <Field name="auto_number">
                                {({ field }: FieldProps) => (
                                    <FormControl isInvalid={!!(errors.auto_number && touched.auto_number)}>
                                        <FormLabel htmlFor="auto_number">Гос-номер</FormLabel>

                                        <Input
                                            borderColor="blackAlpha.700"
                                            variant="outline"
                                            rounded="none"
                                            name="auto_number"
                                            onChange={handleSaveLS(field.onChange, { [field.name]: field.value })}
                                            value={field.value}
                                        />

                                        <FormErrorMessage>{errors.auto_number}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="auto_type">
                                {({ field }: FieldProps) => (
                                    <FormControl isInvalid={!!(errors.auto_type && touched.auto_type)}>
                                        <FormLabel htmlFor="auto_type">Транспортное средство</FormLabel>

                                        <Input
                                            borderColor="blackAlpha.700"
                                            variant="outline"
                                            rounded="none"
                                            name="auto_type"
                                            onChange={handleSaveLS(field.onChange, { [field.name]: field.value })}
                                            value={field.value}
                                        />

                                        <FormErrorMessage>{errors.auto_type}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="date">
                                {({ field }: FieldProps) => (
                                    <FormControl isInvalid={!!(errors.date && touched.date)}>
                                        <FormLabel htmlFor="date">Ориентировочная дата прибытия к покупателю</FormLabel>

                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date) => setFieldValue(field.name, date)}
                                            dateFormat="dd/MM/yyyy"
                                            className={styles.datepicker}
                                        />

                                        <FormErrorMessage>{errors.date as string}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Heading fontSize="2xl">Данные о водителе</Heading>

                            <Field name="fullname">
                                {({ field }: FieldProps) => (
                                    <FormControl isInvalid={!!(errors.fullname && touched.fullname)}>
                                        <FormLabel htmlFor="fullname">ФИО</FormLabel>

                                        <Input
                                            borderColor="blackAlpha.700"
                                            variant="outline"
                                            rounded="none"
                                            name="fullname"
                                            onChange={handleSaveLS(field.onChange, { [field.name]: field.value })}
                                            value={field.value}
                                        />

                                        <FormErrorMessage>{errors.fullname}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <FormControl>
                                <FormLabel htmlFor="pass">Паспортые данные</FormLabel>

                                <HStack>
                                    <Field name="pass_series">
                                        {({ field }: FieldProps) => (
                                            <FormControl isInvalid={!!(errors.pass_series && touched.pass_series)}>
                                                <Input
                                                    type="number"
                                                    borderColor="blackAlpha.700"
                                                    variant="outline"
                                                    rounded="none"
                                                    name="pass_series"
                                                    onChange={handleSaveLS(field.onChange, {
                                                        [field.name]: field.value,
                                                    })}
                                                    value={field.value}
                                                />

                                                <FormErrorMessage>{errors.pass_series}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="pass_number">
                                        {({ field }: FieldProps) => (
                                            <FormControl isInvalid={!!(errors.pass_number && touched.pass_number)}>
                                                <Input
                                                    type="number"
                                                    borderColor="blackAlpha.700"
                                                    variant="outline"
                                                    rounded="none"
                                                    name="pass_number"
                                                    onChange={handleSaveLS(field.onChange, {
                                                        [field.name]: field.value,
                                                    })}
                                                    value={field.value}
                                                />

                                                <FormErrorMessage>{errors.pass_number}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </HStack>
                            </FormControl>

                            <Field name="who_gived">
                                {({ field }: FieldProps) => (
                                    <FormControl isInvalid={!!(errors.who_gived && touched.who_gived)}>
                                        <FormLabel htmlFor="who_gived">Кем выдан</FormLabel>

                                        <Input
                                            borderColor="blackAlpha.700"
                                            variant="outline"
                                            rounded="none"
                                            name="who_gived"
                                            onChange={handleSaveLS(field.onChange, { [field.name]: field.value })}
                                            value={field.value}
                                        />

                                        <FormErrorMessage>{errors.who_gived}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="when_gived">
                                {({ field }: FieldProps) => (
                                    <FormControl isInvalid={!!(errors.when_gived && touched.when_gived)}>
                                        <FormLabel htmlFor="when_gived">Когда выдан</FormLabel>

                                        <Input
                                            as={InputMask}
                                            mask="**.**.****"
                                            borderColor="blackAlpha.700"
                                            variant="outline"
                                            rounded="none"
                                            name="when_gived"
                                            onChange={handleSaveLS(field.onChange, { [field.name]: field.value })}
                                            value={field.value}
                                        />

                                        <FormErrorMessage>{errors.when_gived}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            {Object.values(errors).length}

                            <HStack>
                                <Button
                                    color="white"
                                    background="black"
                                    border="2px"
                                    borderColor="blackAlpha.700"
                                    type="submit"
                                >
                                    Отправить
                                </Button>

                                <Button
                                    color="black"
                                    background="white"
                                    border="2px"
                                    borderColor="blackAlpha.700"
                                    onClick={onResetForm}
                                >
                                    Отменить
                                </Button>
                            </HStack>
                        </VStack>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default AutoForm;
