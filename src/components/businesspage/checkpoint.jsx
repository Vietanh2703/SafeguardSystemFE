import { Button, Form, Input, Modal } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React, { useState } from 'react'

function CheckPointBusiness() {
    const [isOpen, setOpen] = useState(false);




    const handleOpenModal = () => {
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={handleOpenModal}>Create checkpoint</Button>
            <Modal title="Create new checkpoint" open={isOpen} onClose={handleCloseModal} onCancel={handleCloseModal} >

                <Form>

                    <FormItem>
                        <Input />
                    </FormItem>

                    <FormItem>
                        <Input />
                    </FormItem>

                </Form>

            </Modal>
        </div>
    )
}

export default CheckPointBusiness