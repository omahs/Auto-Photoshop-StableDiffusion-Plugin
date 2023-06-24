import React from 'react'
import ReactDOM from 'react-dom/client'
import { observer } from 'mobx-react'
import { AStore } from '../main/astore'

import { SpMenu } from '../util/elements'
// import { Jimp } from '../util/oldSystem'
declare const Jimp: any // make sure you import jimp before importing settings.tsx

type InterpolationMethod = {
    [key: string]: {
        photoshop: string
        jimp: string
    }
}

const interpolationMethods: InterpolationMethod = {
    nearestNeighbor: {
        photoshop: 'nearestNeighbor',
        jimp: Jimp.RESIZE_NEAREST_NEIGHBOR,
    },
    bicubic: {
        photoshop: 'bicubicAutomatic',
        jimp: Jimp.RESIZE_BICUBIC,
    },
}

export const store = new AStore({
    scale_interpolation_method: interpolationMethods.bicubic,
})

const Settings = observer(() => {
    return (
        <div style={{ width: '100%' }}>
            {
                <SpMenu
                    title="select an interploation method for resizing images"
                    items={Object.keys(interpolationMethods)}
                    label_item="Select Interpolation Method"
                    selected_index={Object.keys(interpolationMethods).findIndex(
                        (key) => {
                            return (
                                interpolationMethods[key].photoshop ===
                                    store.data.scale_interpolation_method
                                        .photoshop &&
                                interpolationMethods[key].jimp ===
                                    store.data.scale_interpolation_method.jimp
                            )
                        }
                    )}
                    onChange={(id: any, value: any) => {
                        store.updateProperty(
                            'scale_interpolation_method',
                            interpolationMethods[value.item]
                        )
                    }}
                ></SpMenu>
            }
        </div>
    )
})

const containerNode = document.getElementById('reactSettingsContainer')!
const root = ReactDOM.createRoot(containerNode)

root.render(
    <React.StrictMode>
        <Settings></Settings>
    </React.StrictMode>
)
