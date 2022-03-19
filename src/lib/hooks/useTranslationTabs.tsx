import React, { SyntheticEvent, useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";

const useTranslationTabs = (locales: string[]) => {
    const [tab, setTab] = useState(0);

    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    useEffect(() => {
        setTab(0);
    }, [locales.length]);

    const tabs = (
        <Tabs value={locales.length > tab ? tab : 0} onChange={handleTabChange}>
            {locales.map(locale => (
                <Tab label={locale} />
            ))}
        </Tabs>
    );

    return { tabsElement: tabs, tabIndex: tab };
};

export default useTranslationTabs;
