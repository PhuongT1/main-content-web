import React, { FC, useMemo, useState } from 'react'
import DoughnutChart, { PropPieChart } from './doughnut-chart';
import { Box, Grid, GridSize, SxProps } from '@mui/material';
import { remConvert } from '@/utils/convert-to-rem';

interface Props extends PropPieChart {
    xs?: GridSize,
    sxLegend?: SxProps
}

const CustomDoughnutChart: FC<Props> = ({ labels, data, xs, sxLegend, ...props }) => {
    const [lableSelect, setLableSelect] = useState<number[]>([])
    const dataUpdate = useMemo(() => {
        let newData = [...data || []]
        lableSelect.forEach(item => newData[item] = 0)
        return newData
    }, [data, lableSelect])

    return (
        <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={remConvert('18px')}>
            <DoughnutChart
                labels={[]}
                data={dataUpdate}
                {...props}
            />
            <Grid container spacing={1} sx={{ flexFlow: 'row wrap', whiteSpace: 'nowrap', fontSize: remConvert('12px'), justifyContent: 'center', ...sxLegend }}>
                {labels.map((item, index) => {
                    return (
                        <Grid
                            item
                            display={'flex'}
                            gap={remConvert('6px')}
                            key={index}
                            xs={xs}
                            sx={{ textDecoration: lableSelect.includes(index) ? 'line-through' : 'none', }}
                            onClick={() => {
                                if (lableSelect.includes(index)) {
                                    setLableSelect(prew => prew.filter(prewItem => prewItem !== index))
                                } else setLableSelect(prew => [...prew, index])
                            }}>
                            <Box sx={{
                                width: remConvert('12px'),
                                height: remConvert('12px'),
                                minWidth: remConvert('12px'),
                                backgroundColor: props.backgroundColor[index],
                                borderRadius: '50%',
                                marginBlock: 'auto'
                            }} />
                            {item}
                        </Grid>)
                })}
            </Grid>
        </Box >
    )
}

export default CustomDoughnutChart
