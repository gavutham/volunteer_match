/* eslint-disable react/prop-types */
import { Box, Flex, MultiSelect, Text, TextInput } from "@mantine/core";
import { USER } from "../../utils/constants";
import { DatePicker } from "@mantine/dates";

const Filters = ({ className, filters, setFilters }) => {
  const handleChange = (id, value) => {
    if (id === "title") {
      setFilters({
        title: value,
        tags: filters.tags,
        date: filters.date,
      });
    } else if (id === "date") {
      setFilters({
        title: filters.title,
        tags: filters.tags,
        date: value,
      });
    } else {
      setFilters({
        title: filters.title,
        tags: value,
        date: filters.date,
      });
    }
  };
  return (
    <Box className={className} p="xl">
      <Text fw={400} fz="28px" mb="sm">
        Filters
      </Text>
      <Flex direction="column" gap="md" mb="sm">
        <Text fz="20px">By Tags</Text>
        <MultiSelect
          placeholder="Search by Tags"
          data={USER.TAGS}
          value={filters.tags}
          onChange={(value) => handleChange("tags", value)}
        />
      </Flex>
      <Flex direction="column" gap="md" mb="sm">
        <Text fz="20px">By Title</Text>
        <TextInput
          placeholder="Search by Title"
          onChange={(event) => handleChange("title", event.currentTarget.value)}
        />
      </Flex>
      <Flex direction="column" gap="md" mb="sm">
        <Text fz="20px">By Date</Text>
        <DatePicker
          allowDeselect
          onChange={(value) => handleChange("date", value)}
        />
      </Flex>
    </Box>
  );
};

export default Filters;
