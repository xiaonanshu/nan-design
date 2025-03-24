import React from 'react';
import { VirtualList } from '@nan-design/react/src/index';
import { List, Avatar } from 'antd';
const LEN = 100;
const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;
// const data = [
//     {
//         gender: 'female',
//         name: {
//             title: 'Mrs',
//             first: 'Sharlene',
//             last: 'Washington'
//         },
//         email: 'sharlene.washington@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/women/94.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/women/94.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/women/94.jpg'
//         },
//         nat: 'AU'
//     },
//     {
//         gender: 'male',
//         name: {
//             title: 'Mr',
//             first: 'Petar',
//             last: 'Dinčić'
//         },
//         email: 'petar.dincic@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/men/68.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/men/68.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/men/68.jpg'
//         },
//         nat: 'RS'
//     },
//     {
//         gender: 'female',
//         name: {
//             title: 'Madame',
//             first: 'Irma',
//             last: 'Francois'
//         },
//         email: 'irma.francois@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/women/53.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/women/53.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/women/53.jpg'
//         },
//         nat: 'CH'
//     },
//     {
//         gender: 'female',
//         name: {
//             title: 'Ms',
//             first: 'Fatime',
//             last: 'Buijk'
//         },
//         email: 'fatime.buijk@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/women/59.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/women/59.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/women/59.jpg'
//         },
//         nat: 'NL'
//     },
//     {
//         gender: 'male',
//         name: {
//             title: 'Mr',
//             first: 'علی',
//             last: 'کامروا'
//         },
//         email: 'aaly.khmrw@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/men/73.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/men/73.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/men/73.jpg'
//         },
//         nat: 'IR'
//     },
//     {
//         gender: 'male',
//         name: {
//             title: 'Mr',
//             first: 'Teerth',
//             last: 'Kamath'
//         },
//         email: 'teerth.kamath@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/men/91.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/men/91.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/men/91.jpg'
//         },
//         nat: 'IN'
//     },
//     {
//         gender: 'male',
//         name: {
//             title: 'Monsieur',
//             first: 'Massimo',
//             last: 'Fleury'
//         },
//         email: 'massimo.fleury@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/men/21.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/men/21.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/men/21.jpg'
//         },
//         nat: 'CH'
//     },
//     {
//         gender: 'female',
//         name: {
//             title: 'Mrs',
//             first: 'Deniz',
//             last: 'Koçyiğit'
//         },
//         email: 'deniz.kocyigit@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/women/14.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/women/14.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/women/14.jpg'
//         },
//         nat: 'TR'
//     },
//     {
//         gender: 'female',
//         name: {
//             title: 'Mademoiselle',
//             first: 'Cornelia',
//             last: 'Bernard'
//         },
//         email: 'cornelia.bernard@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/women/44.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/women/44.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/women/44.jpg'
//         },
//         nat: 'CH'
//     },
//     {
//         gender: 'male',
//         name: {
//             title: 'Mr',
//             first: 'Gustav',
//             last: 'Hansen'
//         },
//         email: 'gustav.hansen@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/men/47.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/men/47.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/men/47.jpg'
//         },
//         nat: 'DK'
//     },
//     {
//         gender: 'female',
//         name: {
//             title: 'Miss',
//             first: 'Aaradhya',
//             last: 'Shenoy'
//         },
//         email: 'aaradhya.shenoy@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/women/74.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/women/74.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/women/74.jpg'
//         },
//         nat: 'IN'
//     },
//     {
//         gender: 'male',
//         name: {
//             title: 'Mr',
//             first: 'Christopher',
//             last: 'Gunnestad'
//         },
//         email: 'christopher.gunnestad@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/men/3.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/men/3.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/men/3.jpg'
//         },
//         nat: 'NO'
//     },
//     {
//         gender: 'female',
//         name: {
//             title: 'Ms',
//             first: 'Xiomara',
//             last: 'Silva'
//         },
//         email: 'xiomara.silva@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/women/35.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/women/35.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/women/35.jpg'
//         },
//         nat: 'BR'
//     },
//     {
//         gender: 'female',
//         name: {
//             title: 'Ms',
//             first: 'Ava',
//             last: 'Bergeron'
//         },
//         email: 'ava.bergeron@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/women/59.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/women/59.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/women/59.jpg'
//         },
//         nat: 'CA'
//     },
//     {
//         gender: 'female',
//         name: {
//             title: 'Miss',
//             first: 'Emmi',
//             last: 'Lehto'
//         },
//         email: 'emmi.lehto@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/women/6.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/women/6.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/women/6.jpg'
//         },
//         nat: 'FI'
//     },
//     {
//         gender: 'male',
//         name: {
//             title: 'Mr',
//             first: 'Loris',
//             last: 'Schmitt'
//         },
//         email: 'loris.schmitt@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/men/98.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/men/98.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/men/98.jpg'
//         },
//         nat: 'FR'
//     },
//     {
//         gender: 'female',
//         name: {
//             title: 'Miss',
//             first: 'Martha',
//             last: 'Powell'
//         },
//         email: 'martha.powell@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/women/75.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/women/75.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/women/75.jpg'
//         },
//         nat: 'AU'
//     },
//     {
//         gender: 'male',
//         name: {
//             title: 'Mr',
//             first: 'Cory',
//             last: 'Bell'
//         },
//         email: 'cory.bell@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/men/22.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/men/22.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/men/22.jpg'
//         },
//         nat: 'GB'
//     },
//     {
//         gender: 'female',
//         name: {
//             title: 'Ms',
//             first: 'Yolanda',
//             last: 'Véliz'
//         },
//         email: 'yolanda.veliz@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/women/15.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/women/15.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/women/15.jpg'
//         },
//         nat: 'MX'
//     },
//     {
//         gender: 'female',
//         name: {
//             title: 'Ms',
//             first: 'Anna',
//             last: 'Gomez'
//         },
//         email: 'anna.gomez@example.com',
//         picture: {
//             large: 'https://randomuser.me/api/portraits/women/40.jpg',
//             medium: 'https://randomuser.me/api/portraits/med/women/40.jpg',
//             thumbnail: 'https://randomuser.me/api/portraits/thumb/women/40.jpg'
//         },
//         nat: 'AU'
//     }
// ];

const ListTest = () => {
    const renderItem = (item, index) => {
        return (
            <List.Item style={{ height: heights[index] }}>
                <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={<a href="https://ant.design">{item.name.last}</a>}
                    description={item.email}
                />
                <div>Content</div>
            </List.Item>
        );
    };
    const [data, setData] = React.useState([]);
    const [heights, setHeights] = React.useState([]);

    const appendData = () => {
        setTimeout(() => {
            fetch(fakeDataUrl)
                .then((res) => res.json())
                .then((body) => {
                    setData(data.concat(body.results));
                    setHeights(
                        heights.concat(
                            body.results.map(() => {
                                return (Math.random() * 2 + 1) * 40;
                            })
                        )
                    );
                });
        }, 2000);
    };

    return (
        <List>
            <VirtualList
                fixedHeight={false}
                renderItem={renderItem}
                height={ContainerHeight}
                itemHeight={50}
                data={data}
                gap={20}
                itemKey="email"
                requestMore={appendData}
                style={{ width: '200px', height: '200px' }}
            ></VirtualList>
        </List>
    );
};
export default ListTest;
