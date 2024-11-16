import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserData } from "@/types/userData"

type HomeScreenProps = {
  userData: UserData
}

const HomeScreen = ({userData} : HomeScreenProps) => {
    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                <CardTitle>Total Balance</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="text-3xl font-bold">
                    ${userData.totalBalance.toLocaleString()}
                </div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              {userData.assets.map(asset => (
                <Card key={asset.name}>
                  <CardHeader>
                    <CardTitle>{asset.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-semibold">${asset.value.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{asset.amount} {asset.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
    )
}

export default HomeScreen