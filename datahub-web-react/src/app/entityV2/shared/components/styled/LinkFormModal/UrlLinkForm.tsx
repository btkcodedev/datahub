import { Form, FormInstance } from "antd";
import { LinkFormData } from "./types";
import { Input } from "@components";

interface Props {
    initialValues?: Partial<LinkFormData>;

}

export function UrlLinkForm({ initialValues }: Props) {
    return <>
        <Form.Item
            data-testid="link-form-modal-url"
            name="url"
            initialValue={initialValues?.url}
            rules={[
                {
                    required: true,
                    message: 'A URL is required.',
                },
                {
                    type: 'url',
                    message: 'This field must be a valid url.',
                },
            ]}
        >
            <Input label="URL" placeholder="https://" autoFocus />
        </Form.Item>

        <Form.Item
            data-testid="link-form-modal-label"
            name="label"
            initialValue={initialValues?.label}
            rules={[
                {
                    required: true,
                    message: 'A label is required.',
                },
            ]}
        >
            <Input label="Label" placeholder="A short label for this link" />
        </Form.Item></>
}