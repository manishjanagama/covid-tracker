import { Card, CardContent, Typography } from "@material-ui/core"
import "./infoBox.css"

const InfoBox = ({title, cases, total}) => {
    return(
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox-title">{title}</Typography>
                <h3 className="infoBox-cases">+{cases}</h3>
                <Typography className="infoBox-total">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox