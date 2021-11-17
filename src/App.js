import { useState } from 'react'
import './App.css'
import styled from 'styled-components'




export default function BLE() {

    const [logs, setLogs] = useState()
    let device
    let server
    let service
    let characteristic
    let value

    let UUID = '00001800-0000-1000-8000-00805f9b34fb'
    // let UUID = '74ab521e-060d-46df-aa64-cf4df2d0d640'
    // let UUID = 'gap.device_name'

    let SERVICE = 'a4e649f4-4be5-11e5-885d-feff819cdc9f'
    // let SERVICE = '0000fef5-0000-1000-8000-00805f9b34fb'
    // let SERVICE = '00002ea7-0000-1000-8000-00805f9b34fb'
    // let SERVICE = '74ab521e-060d-26df-aa64-cf4df2d0d642'
    // let SERVICE = '00001800-0000-1000-8000-00805f9b34fb'

    // 'gap.device_name' + 
    // 'gap.appearance' + 


    const connect = async () => {

        try {
            // BLE connect settings
            device = await navigator.bluetooth.requestDevice({
                filters: [{ name: 'itelma-150721x5' }],
                optionalServices: [SERVICE]
            })
            console.log('---', '1 - device', device);

            // Connect to Device
            server = await device.gatt.connect()
            console.log('---', '2 - server', server);

            // Get the Service
            service = await server.getPrimaryService(SERVICE)
            console.log('---', '3 - service', service);

            // gap.device_name - тут я поставил получить имя, т.к. другие параметры не смог вытащить
            characteristic = await service.getCharacteristic(UUID)
            console.log('---', '4 - characteristic', characteristic);

            value = await characteristic.readValue()
            console.log('---', '5 - value', value);

        } catch (error) {
            // Error handling!
            // setLogs(logs + error.message)
            console.error('Error:', error)
            // device.gatt.disconnect()
        }

    }

    const disconnect = () => {
        device.gatt.disconnect()
        console.log('---', 'X - device', device);
    }


    return (
        <BLEWrapper>
            <Text>
                <Title>Avtelma BLE \n Device Tester</Title>
                <P>Use BLE to get device data</P>
            </Text>
            <ConnectButton onClick={connect}>Connect</ConnectButton>
            <ConnectButton onClick={disconnect}>Disconnect</ConnectButton>
            <Log>{logs}</Log>
        </BLEWrapper>
    )

}

const BLEWrapper = styled.div`

`

const Text = styled.div`

`

const Title = styled.div`

`

const P = styled.div`

`

const ConnectButton = styled.button`

`

const Log = styled.div`
    border: 1px #000 solid;
    max-width: 50%;
    min-height: 200px;
`